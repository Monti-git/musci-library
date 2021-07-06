const fetcher = async (callback) => {
    try {
        const data = await callback()
        return [null, data]
    } catch (error) {
        return [error, null]
    }
}

//maybe the methods need to have .exec() at the end.
exports.inviteUser = async (req, res) => {
    var invitationBody = req.body;
    var { email } = invitationBody;
    var { shopId } = req.params;
    var authUrl = "https://url.to.auth.system.com/invitation";

    //sending invitation
    const [error, invitationResponse] = await fetcher(superagent
        .post(authUrl)
        .send(invitationBody));
    if (error) {
        res.status(400).json({
            error: true,
            message: error
        });
        return;
    }
    if (invitationResponse.status === 200) {
        res.status(400).json({
            error: true,
            message: 'User already invited to this shop'
        });
        return;
    }

    const { authId, invitationId } = invitationResponse.body;
    let filter = { authId };
    let update = { authId, email }
    let options = { upsert: true, new: true }

    //updating/creating user
    const [userError, newUser] = await fetcher(
        User.findOneAndUpdate(filter, update, options)
    )
    
    if (userError) {
        res.status(500).json({
            error: true,
            message: userError
        });
        return;
    }

    //updating shop
    const [shopError, shop] = await fetcher(
        Shop.findByIdAndUpdate(shopId, {
            $addToSet: { invitations: invitationId },
            $addToSet: { users: newUser._id }
        }, { new: true })
    )

    if (shopError || !shop) {
        return res.status(500).send(err || { message: 'No shop found' });
    }

    res.json(invitationResponse);
};
