
isAdmin = async (req, res, next) => {

    console.log(req.user);

    try {
        if (req.user.role == 'Admin') {
            res.status(200).send('OK')
            next()
          } else {
            res.status(403).send('You don\'t have permissions')
          }
    } catch (error) {
        res.status(500).send(error)
    }

};

module.exports = isAdmin;
