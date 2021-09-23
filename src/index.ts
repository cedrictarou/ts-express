import express, { Request, Response, NextFunction } from 'express'
// import todoRoutes from './routes/todos'
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from './entity/User'
// create typeorm connection
createConnection()
  .then(() => {

    // create and setup express app
    const app = express()
    app.use(express.json());

    // register routes
    // app.use('/todos', todoRoutes)

    // ユーザー詳細
    app.get("/users/:id", async (req: Request, res: Response) => {
      const results = await User.findOneOrFail(req.params.id);
      return res.json(results);
    });
    // 全ユーザーを表示
    app.get("/users", async (req: Request, res: Response) => {
      const results = await User.find();
      return res.json(results);
    });
    // ユーザーを登録
    app.post("/users", async (req: Request, res: Response) => {
      const user = await User.create(req.body);
      const results = await User.save(user);
      return res.json(results);
    });
    // ユーザー情報を更新
    app.put("/users/:id", async (req: Request, res: Response) => {
      // User.findOne()を使用するとエラーになるのでFindOneOrFailを使用
      const user = await User.findOneOrFail(req.params.id);
      User.merge(user, req.body);
      const results = await User.save(user);
      return res.json(results);
    });
    // ユーザーを削除
    app.delete("/users/:id", async (req: Request, res: Response) => {
      await User.delete(req.params.id);
      const message = "The user is deleted!!"
      return res.json(message);
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(500).json({ message: err.message })
    })

    // start express server
    app.listen(3000, () => console.log('Server up at http://localhost:3000'))
  }).catch(error => console.log(error));