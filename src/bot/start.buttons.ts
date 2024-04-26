import { Markup } from 'telegraf';

export function startButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback('Say meow', 'Meow'),
      Markup.button.callback('Say bark', 'Bark'),
      Markup.button.callback('Say moo', 'Moo'),
    ],
    {
      columns: 3,
    },
  );
}
