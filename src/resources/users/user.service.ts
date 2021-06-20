import { getConnection } from 'typeorm';
import Repository from '../../common/repository';
import { IUser } from '../../common/interfaces';
import User from '../../entities/User';
import Task from '../../entities/Task';

const usersRepo = new Repository<IUser>(User);

/**
 * Returns the list of registered users
 * @returns {Array<User>} - List of users
 */
const getAll = () => usersRepo.getAll();

/**
 * Returns the user information by given id
 * @param {string} id - a user's identifier
 * @returns {object} - User's information
 */
const get = (id: string) => usersRepo.get(id);

/**
 * Removes the user by given id
 * @param {string} userId - a user's identifier
 * @returns {void} - Nothing
 */
const remove = async (id: string) => {
  await usersRepo.remove(id);

  // set tasks corresponding userId to null
  await getConnection()
    .createQueryBuilder()
    .update(Task)
    .set({ userId: null })
    .where('userId = :id', { id })
    .execute();
};

/**
 * Creates or Updates a user by given information
 * @param {object} user - information that need to be updated
 * @returns {object} - Updated user's information
 */
const update = (user: IUser) => usersRepo.update(user);

export default { getAll, get, remove, update };
