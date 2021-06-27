import { createConnection } from 'typeorm';
import ormConfig, { PORT } from './common/config';
import { app } from './app';

createConnection(ormConfig)
  .then(() => {
    app.listen(PORT, () =>
      // eslint-disable-next-line no-console
      console.log(`App is running on http://localhost:${PORT}`),
    );
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));
