import { atom } from 'recoil';

export const pixivModeState = atom({
  key: 'pixivModeState',
  default: 'day'
});

export const pixivImagesData = atom({
  key: 'imagesData',
  default: []
});

export const pixivOffsetState = atom({
  key: 'pixivOffsetState',
  default: 0
});

export const pixivDateState = atom<Date | null>({
  key: 'pixivDateState',
  default: new Date()
});


export const isInitialRunState = atom({
  key: 'isInitialRunState',
  default: true
});

