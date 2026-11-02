import Watch from "./models/Watchs.js";
import fileService from "./fileService.js";

class WatchsController {
  async getWatchs(req, res) {
    try {
      const watchs = await Watch.find();
      res.json(Watchs);
      console.log(Watchs);
    } catch (error) {
      console.log("Ошибка при получении часов: " + error);
    }
  }

  async addWatch(req, res) {
    try {
      let fileName = null;
      console.log(req.files.image);

      if (req.files && req.files.image) {
        fileName = await fileService.saveFile(req.files.image);
        if (!fileName) {
          return res.send("Ошибка при добавлении файла ", fileName);
        }
      }

      const { title, category, type, material, color, price } = req.body;
      const newWatch = await Watch.create({
        title,
        category,
        type,
        material,
        color,
        price,
      });

      await newWatch.save();
      res.send("Часы успешно добавлен!");
    } catch (error) {
      console.log("Ошибка при добавлении часов: " + error);
    }
  }
  async deleteWatchs(req, res) {
    try {
      const { id } = req.params;
      const watch = await Watch.findByIdAndDelete(id);

      if (!watch) {
        return res.status(404).send("Часы не найдены");
      }

      res.send("Часы успешно удалены!!");
    } catch (error) {
      console.log("ОШИБКА ПРИ УДАЛЕНИИ ЧАСОВ ---- " + error);
      res.status(500).send("Ошибка сервера");
    }
  }
    async patchWatchs(req, res) {
    try {
      const { id } = req.params;
      const { title, category, type, material, color, price  } = req.body;
      console.log(title, category, type, material, color, price );

      const updatedWatch = await Watch.findByIdAndUpdate(
        id,
        { title, category, type, material, color, price  },
        { new: true },
      );

      if (!updatedWatch) {
        return res.status(404).send("Не существует!");
      }

      res.send("Данные успешно изменены!");
    } catch (error) {
      console.log("Ошибка, не удалось выполнить команду --" + error);
      res.status(500).send("Ошибка сервера");
    }
  }
  async putWatchs(req, res) {
    try {
      const { id } = req.params;
      const { title, category, type, material, color, price  } = req.body;
      const updatedWatch = await Watch.findByIdAndUpdate(
        id,
        { title, category, type, material, color, price },
        { new: true },
      );

      if (!updatedWatch) {
        return res.status(404).send("Не существует!");
      }

      res.send("Данные успешно обновлены!");
    } catch (error) {
      console.log("Ошибка при PUT запросе --" + error);
      res.status(500).send("Ошибка сервера");
    }
  }
}

export default new WatchsController();
