import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      name: 'NESTJS_SESSION_ID',
      secret: 'my-secret', // changed in futur
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 3600000, httpOnly: true },
    }),
  );

  // app.use(passport.initialize());
  // app.use(passport.session()); ???

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// finish this
