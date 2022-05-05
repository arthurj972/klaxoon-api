const appExpress = require('./app');

appExpress.listen(process.env.PORT, () => {
	console.log(`Klaxoon API listening on http://localhost:${process.env.PORT}`);
});