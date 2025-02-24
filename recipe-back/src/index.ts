import createServer from "./app";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const app = createServer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
