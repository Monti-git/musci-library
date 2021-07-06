exports.inviteUser = function (req, res) {
    var invitationBody = req.body;
    var shopId = req.params.shopId;
    var authUrl = "https://url.to.auth.system.com/invitation";

    superagent
        .post(authUrl)
        .send(invitationBody)
        .end(function (err, invitationResponse) {
            if (invitationResponse.status === 201) {
                User.findOneAndUpdate(
                    {
                        authId: invitationResponse.body.authId
                    },
                    {
                        authId: invitationResponse.body.authId,
                        email: invitationBody.email
                    },
                    {
                        upsert: true,
                        new: true
                    },
                    function (err, createdUser) {
                        Shop.findById(shopId).exec(function (err, shop) {
                            if (err || !shop) {
                                return res.status(500).send(err || { message: 'No shop found' });
                            }
                            if (shop.invitations.indexOf(invitationResponse.body.invitationId)) {
                                shop.invitations.push(invitationResponse.body.invitationId);
                            }
                            if (shop.users.indexOf(createdUser._id) === -1) {
                                shop.users.push(createdUser);
                            }
                            shop.save();
                        });
                    }
                );
            } else if (invitationResponse.status === 200) {
                res.status(400).json({
                    error: true,
                    message: 'User already invited to this shop'
                });
                return;
            }
            res.json(invitationResponse);
        });
};

// ●	What do you think is wrong with the code, if anything?
// The most evident errors are :
//     -no checking for err in the first or second callback
//     -In line 28, the check for existing invitation is done incorrectly, the right way is
//      how it is done in line 31 (comparing to -1)
// ●	Can you see any potential problems that could lead to exceptions
//      If many shops are being updated at the same time, the users/invitations list might
//      get overwritten
// ●	How would you refactor this code to:
// ○	Make it easier to read
//      -get rid of nested callbacks
// ○	Increase code reusability
//      -make the methods generic enough for other models to use for their updates
// ○	Improve the stability of the system
//      -use findOneAndUpdate for shop updates
// ○	Improve the testability of the code
//      -make callbacks methods
// ●	How might you use the latest JavaScript features to refactor the code?
//      -destructuring the variables like authId, email and shopId from the objects they are retrieved
//      -using arrow functions in the callbacks
//      -using await instead of callbacks
