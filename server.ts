import app from './app';

app.listen(process.env.PORT, () => {
	console.log(`Klaxoon API listening on http://localhost:${process.env.PORT}`);
});
