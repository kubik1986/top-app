import React from 'react';
import { Button, Htag, Ptag } from '../components';

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button appearance="primary" arrow="right">
        Кнопка
      </Button>
      <Button appearance="transparent" arrow="down">
        Кнопка
      </Button>
      <Ptag>Авто</Ptag>
      <Ptag textSize="s">Маленький</Ptag>
      <Ptag textSize="m">Средний</Ptag>
      <Ptag textSize="l">Большой</Ptag>
    </>
  );
}
