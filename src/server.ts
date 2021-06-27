import { Connection, createConnection } from 'typeorm';
import ormConfig, { PORT } from './common/config';
import { app } from './app';

const run = async () => {
  try {
    const connection: Connection = await createConnection(ormConfig);
    await connection.runMigrations();
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`App is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    // If failed to connect, wait for 5sec and try again
    setTimeout(run, 5000);
  }
};

run();
