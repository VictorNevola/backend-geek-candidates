import app from './appConfig';

const PORT : string|number = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`hosting @${PORT}`));
