import { PORT, CONNECTION } from './common/config';
import { Database } from './common/db';
import app from './app';

const db = new Database();

db.getConnection(CONNECTION!).then(() => {
  app.listen(PORT, () =>
    // eslint-disable-next-line no-console
    console.log(`App is running on http://localhost:${PORT}`),
  );
});
