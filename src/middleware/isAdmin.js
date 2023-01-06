
isAdmin = async (req, res, next) => {

    console.log(req.user);

    try {
        if (req.user.role == 'Admin') {
            next()
          } else {
            return res.status(403).send('You don\'t have permissions')
          }
    } catch (error) {
        return res.status(500).send(error)
    }

};

module.exports = isAdmin;
