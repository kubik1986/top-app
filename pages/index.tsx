import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import {
  AnchorBtn,
  Button,
  Htag,
  Input,
  Ptag,
  Rating,
  Tag,
  Textarea,
} from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';
import { API } from '../helpers/api';

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(2.7);

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
      <Rating rating={rating} isEditable setRating={setRating}></Rating>
      <Input placeholder="Тест" />
      <Textarea placeholder="Тест" />
      <AnchorBtn href="#" appearance="primary">
        Ссылка1
      </AnchorBtn>
      <AnchorBtn href="#" appearance="transparent" target="_blank">
        Ссылка2
      </AnchorBtn>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = TopLevelCategory.Courses;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
}
