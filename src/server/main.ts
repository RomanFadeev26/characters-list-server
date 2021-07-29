import { NestFactory } from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {renderToString} from 'react-dom/server';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.setBaseViewsDir(join(__dirname, '..', '..' , 'views'));
  app.useStaticAssets(join(process.env.NODE_PATH, 'public'));
  app.engine(process.env.RENDER_ENGINE, (viewPath, options, callback) => {
    const view = require(viewPath).default;
    const html = renderToString(view);
    callback(null, `
        <!DOCTYPE>
        <body>
            <div id="app">${html}</div>
        </body>
        <script src="main.js"></script>
    `);
  });
  app.set('view engine', process.env.RENDER_ENGINE);

  await app.listen(8080);
}

bootstrap();
