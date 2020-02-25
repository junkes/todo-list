class Routes {
  init (app, DB, redis) {
    app.get('/', async (req, res) => {
      res.end('api online')
    })
    
    app.get('/tasks', (req, res) => {
      try {
        let client = redis.createClient({host: 'redis'})
        client.get('tasks', async (err, tasks) => {
          if (err) console.error(err)
          if (tasks && tasks.trim().length) {
            res.status(200).json({origin: 'cache', tasks: JSON.parse(tasks)})
          } else {
            const tasks = await DB.getTasks()
            res.status(200).json({origin: 'database' , tasks})
            client.set("tasks", JSON.stringify(tasks), (err, reply) => {
              if (err) console.error(err)
            })
          }
        })
      } catch (error) {
        console.log(error)
        res.status(500)
      }
    })
    
    app.post('/tasks', async (req, res) => {
      try {
        const inserted = await DB.insertTask(req)
        if (!inserted) {
          throw 'Erro na validação dos dados!'
        }
        res.status(201).json(inserted)
        let client = redis.createClient({host: 'redis'})
        client.set("tasks", '', (err, reply) => {
          if (err) console.error(err)
        })
      } catch (error) {
        console.error(error)
        res.status(500).end(error)
      }
    })
    
    app.put('/tasks/:id', async (req, res) => {
      try {
        const updated = await DB.updateTask(req)
        if (!updated) {
          throw 'Erro na validação dos dados!'
        }
        res.status(200).json(updated)
        let client = redis.createClient({host: 'redis'})
        client.set("tasks", '', (err, reply) => {
          if (err) console.error(err)
        })
      } catch (error) {
        console.error(error)
        res.status(500)
      }
    })
    
    app.delete('/tasks/:id', async (req, res) => {
      try {
        const deleted = await DB.deleteTask(req)
        res.status(204).json(deleted)
        let client = redis.createClient({host: 'redis'})
        client.set("tasks", '', (err, reply) => {
          if (err) console.error(err)
        })
      } catch (error) {
        console.error(error)
        res.status(500)
      }
    })
  }
}

module.exports = Routes