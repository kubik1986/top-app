import React from 'react';
import { Button, Htag, Ptag, Tag } from '../components';

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
      <Tag>Мал прозр</Tag>
      <Tag size="m">Бол прозр</Tag>
      <Tag size="s" color="red">
        Мал крас
      </Tag>
      <Tag size="m" color="red">
        Бол крас
      </Tag>
      <Tag color="gray">Мал сер</Tag>
      <Tag size="m" color="gray">
        Бол сер
      </Tag>
      <Tag color="green">Мал зел</Tag>
      <Tag size="m" color="green">
        Бол зел
      </Tag>
      <Tag color="primary">Мал осн</Tag>
      <Tag size="m" color="primary">
        Бол осн
      </Tag>
      <Tag href="#">Мал прозр ссылка</Tag>
      <Tag color="red" href="#">
        Мал крас ссылка
      </Tag>
      <Tag color="gray" href="#">
        Мал сер ссылка
      </Tag>
      <Tag color="green" href="#">
        Мал зел ссылка
      </Tag>
      <Tag color="primary" href="#">
        Мал осн ссылка
      </Tag>
    </>
  );
}
