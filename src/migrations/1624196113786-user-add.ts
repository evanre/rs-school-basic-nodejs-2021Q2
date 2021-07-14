import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcrypt';

const adminLogin = 'admin';

export class userAdd1624196113786 implements MigrationInterface {
  name = 'userAdd1624196113786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = bcrypt.hashSync(adminLogin, 10);

    await queryRunner.query(
      `INSERT INTO public.user(name, login, password) values($1, $1, $2)`,
      [adminLogin, password],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public.user WHERE login = $1`, [
      adminLogin,
    ]);
  }
}
