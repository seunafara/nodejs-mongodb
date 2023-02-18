module.exports = {
    'get#': (req: { user: any; }) => {
        console.log('Hello ' + req.user.username);
    }
}
