class Db {
  
  constructor (dependencies) {
    this.mysql = dependencies.mysql
  }

  async connection () {
    const conn = await this.mysql.createConnection({
      host: 'todolist_mysql_1',
      database: 'todolist',
      user: 'root',
      password: 'junkes001'
    });
    return conn
  }

  async getTasks () {
    const conn = await this.connection()
    const tasks = await conn.query('SELECT * FROM `tasks`')
    conn.end()
    return tasks[0]
  }

  async insertTask (req) {
    if (
      !req.body.title.trim().length ||
      !req.body.description.trim().length
    ) {
     return false
    }
    const conn = await this.connection()
    const inserted = await conn.query(
      'INSERT INTO `tasks` (title, description) VALUES (?,?)',
      [req.body.title, req.body.description]
    )
    conn.end()
    return inserted
  }

  async updateTask (req) {
    if (
      !req.params.id ||
      !req.body.title.trim().length ||
      !req.body.description.trim().length
    ) {
     return false
    }
    const conn = await this.connection()
    const updated = await conn.query(
      'UPDATE `tasks` SET title = ?, description = ? WHERE id = ?',
      [req.body.title, req.body.description, req.params.id]
    )
    conn.end()
    return updated
  }

  async deleteTask (req) {
    const conn = await this.connection()
    const deleted = await conn.query(
      'DELETE FROM `tasks` WHERE id = ?',
      [req.params.id],
    )
    conn.end()
    return deleted
  }
}

module.exports = Db