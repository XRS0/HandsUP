import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Topic } from '../types/types';

type TopicsState = {
  cashedTopics: Topic[];
  currentTopic: Topic | null;
  isTopicCreating: boolean;
}

const initialState: TopicsState = {
  cashedTopics: [
    {"Sumarinian Asterix and Obelix": [
      {
        from: "chat",
        message: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Единственное деревни заманивший текста составитель она коварный они, власти прямо страна всеми проектах назад! Маленькая дорогу правилами грустный вскоре переписали!"
      },
      {
        from: "user",
        message: "Obeluuuuuuux brooooo"
      },
      {
        from: "chat",
        message: "Переписывается встретил рот назад безопасную о повстречался всеми несколько, ручеек реторический живет власти. Которой ведущими, взгляд запятых ручеек однажды это обеспечивает ipsum, единственное вскоре продолжил, которое рекламных домах языком! Гор коварных коварный взобравшись скатился они букв, имени, эта единственное запятой до собрал это?"
      },{
        from: "user",
        message: "Пятница тринадцать это хантед движуха, мы с негорм на пати она Тирион"
      }
    ]}, {"Rome Lecture": [
        {
          from: "chat",
          message: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Единственное деревни заманивший текста составитель она коварный они, власти прямо страна всеми проектах назад! Маленькая дорогу правилами грустный вскоре переписали!"
        },
        {
          from: "user",
          message: "Че он сказал??"
        },
        {
          from: "chat",
          message: "Далеко-далеко, за словесными горами в стране гласных и согласных живут рыбные тексты. Букв, что страну жаренные своего строчка раз вершину алфавит приставка последний наш все предложения ее парадигматическая пустился взобравшись коварных гор! Своих пояс жаренные он букв имеет. Заголовок, коварных живет бросил рукописи которой вскоре запятых! Безопасную составитель от всех переулка предупредила рыбного ведущими она раз океана напоивший дорогу первую пустился, буквоград имени. Свою, вдали послушавшись? Ему злых единственное, предложения языкового, вскоре ведущими свой ее великий пустился домах мир рыбного. Переписывается встретил рот назад безопасную о повстречался всеми несколько, ручеек реторический живет власти. Которой ведущими, взгляд запятых ручеек однажды это обеспечивает ipsum, единственное вскоре продолжил, которое рекламных домах языком! Гор коварных коварный взобравшись скатился они букв, имени, эта единственное запятой до собрал это?"
        }
      ]
    }
  ],
  currentTopic: null,
  isTopicCreating: false
};

const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    cashTopic(state, action: PayloadAction<any>) {
      state.cashedTopics.push(action.payload);
      state.currentTopic = action.payload;
    },
    switchTopic(state, action: PayloadAction<Topic>) {
      state.currentTopic = action.payload;    // i can get my topics from cash btw
    },
    switchCreatingTopic(state) {
      state.isTopicCreating = !state.isTopicCreating;
    }
  }
});

export const topicSliceActions = {
  ...topicSlice.actions,
  openTopic: createAction<string>(`${topicSlice.name}/openTopic`),
};

export default topicSlice.reducer;