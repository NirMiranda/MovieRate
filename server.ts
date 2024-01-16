import initApp from './app';
import { Application } from 'express';

initApp().then((app: Application) => {
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`MovieRate APP is listening on port ${port}!`)
    });
});
