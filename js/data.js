/* RIVIERA DISTRICT — data. Every object, price and figure is fictional.
   Every item has photo: "images/….jpg"; `seed` is only used for the generated fallback when `photo` is absent. */
window.DATA = {
  types: { apartment: 'Апартаменты', penthouse: 'Пентхаус', family: 'Семейная резиденция' },

  // Interactive map points (x, y in the 800×520 SVG)
  map: [
    { id: 'blocks', title: 'Жилые кварталы', x: 130, y: 130, photo: "images/architecture-03.jpg", seed: 21, text: 'Двенадцать кварталов с тихими дворами, подземными парковками и видом на парк. Высота зданий — от четырёх до четырнадцати этажей.' },
    { id: 'park', title: 'Центральный парк', x: 235, y: 265, photo: "images/central-park.jpg", seed: 22, text: 'Девять гектаров сосен, лужаек и прудов. По утрам — пробежки, по вечерам — открытый кинотеатр под небом.' },
    { id: 'promenade', title: 'Набережная', x: 560, y: 245, photo: "images/waterfront.jpg", seed: 23, text: 'Три километра променада из светлого камня: велодорожка, скамьи у воды и причал для небольших яхт.' },
    { id: 'food', title: 'Рестораны', x: 430, y: 130, photo: "images/restaurant.jpg", seed: 24, text: 'Кластер из шести ресторанов и кофеен с террасами. Рыба и морепродукты — от рыбаков ближайшего порта.' },
    { id: 'sport', title: 'Спортивный комплекс', x: 125, y: 404, photo: "images/sports.jpg", seed: 25, text: 'Бассейн 50 метров, теннисные корты, студии йоги и беговой овал вокруг футбольного поля.' },
    { id: 'gallery', title: 'Торговая галерея', x: 405, y: 390, photo: "images/shopping.jpg", seed: 26, text: 'Крытая галерея под стеклянной крышей: бутики, книжный магазин, рынок свежих продуктов по выходным.' },
    { id: 'marina', title: 'Марина', x: 600, y: 432, photo: "images/marina.jpg", seed: 27, text: 'Причал на 40 яхт, яхт-клуб с лаунж-зоной и кафе над водой. Отсюда уходят вечерние прогулки к закату.' }
  ],

  archTypes: [
    { id: 'all', label: 'Все' }, { id: 'residential', label: 'Жилые' }, { id: 'public', label: 'Общественные' },
    { id: 'commercial', label: 'Коммерческие' }, { id: 'sport', label: 'Спорт' }
  ],

  arch: [
    { name: 'Дом Marea', type: 'residential', floors: '6 этажей', style: 'Современный модернизм', photo: "images/architecture-01.jpg", seed: 1, id: 1, gal: ['architecture-03','waterfront','interior-01'], mat: 'Известняк, светлый бетон, дуб', res: [1, 2], text: 'Террасные квартиры с зелёными балконами и видом на воду.' },
    { name: 'Башня Horizon', type: 'residential', floors: '14 этажей', style: 'Минимализм', photo: "images/architecture-02.jpg", seed: 2, id: 2, gal: ['architecture-04','sunset','interior-01'], mat: 'Стекло, алюминий, белый камень', res: [5, 6], text: 'Акцент района: стройный силуэт и панорамные пентхаусы.' },
    { name: 'Вилла Giardino', type: 'residential', floors: '3 этажа', style: 'Средиземноморский модерн', photo: "images/architecture-04.jpg", seed: 3, id: 3, gal: ['architecture-03','central-park','interior-02'], mat: 'Известняк, дерево, латунь', res: [7, 8, 9], text: 'Семейные дома с внутренними садами и бассейнами.' },
    { name: 'Павильон Набережной', type: 'public', floors: '2 этажа', style: 'Органическая архитектура', photo: "images/waterfront.jpg", seed: 4, id: 4, gal: ['marina','sunset','restaurant'], mat: 'Тик, стекло, латунь', text: 'Волнообразная крыша над кафе и выставочным залом.' },
    { name: 'Театр на воде', type: 'public', floors: '4 этажа', style: 'Скульптурный модерн', photo: "images/marina.jpg", seed: 5, id: 5, gal: ['sunset','waterfront','architecture-04'], mat: 'Светлый бетон, стекло', text: 'Камерная сцена на 400 мест с фойе, открытым к морю.' },
    { name: 'Галерея Sabbia', type: 'commercial', floors: '3 этажа', style: 'Светлый брутализм', photo: "images/shopping.jpg", seed: 6, id: 6, gal: ['restaurant','waterfront'], mat: 'Стеклянная крыша, мрамор, латунь', text: 'Торговая галерея под стеклянной крышей и с внутренним садом.' },
    { name: 'Рынок Mercato', type: 'commercial', floors: '2 этажа', style: 'Индустриальный минимализм', photo: "images/restaurant.jpg", seed: 7, id: 7, gal: ['shopping','waterfront'], mat: 'Кирпич, сталь, стекло', text: 'Бывший склад порта, ставший гастрономическим рынком.' },
    { name: 'Спорт-клуб Lido', type: 'sport', floors: '3 этажа', style: 'Хай-тек', photo: "images/sports.jpg", seed: 8, id: 8, gal: ['waterfront','central-park'], mat: 'Стекло, камень, нержавеющая сталь', text: 'Бассейн, залы и спа с панорамным остеклением.' }
  ],

  estate: [
    { id: 1, type: 'apartment', title: 'Marea Studio', rooms: 1, area: 48, price: 285000, floor: 3, block: 'Квартал Marea', view: 'Двор-сад', photo: "images/interior-02.jpg", seed: 11, gal: ['interior-01','architecture-01'], desc: 'Светлая студия с зоной сна и террасой во двор. Первый дом у моря.', feat: ['Терраса', 'Кладовая'] },
    { id: 2, type: 'apartment', title: 'Marea Two', rooms: 2, area: 72, price: 412000, floor: 5, block: 'Квартал Marea', view: 'Набережная', photo: "images/interior-01.jpg", seed: 12, gal: ['interior-02','architecture-01','waterfront'], desc: 'Две комнаты с видом на набережную: просторная гостиная и гардеробная.', feat: ['Балкон', 'Гардеробная'] },
    { id: 3, type: 'apartment', title: 'Sabbia Garden', rooms: 2, area: 86, price: 468000, floor: 7, block: 'Квартал Sabbia', view: 'Парк', photo: "images/architecture-03.jpg", seed: 13, gal: ['interior-01','central-park'], desc: 'Две спальни и окна от пола до потолка, выходящие на парк.', feat: ['Две спальни', 'Панорамные окна'] },
    { id: 4, type: 'apartment', title: 'Sabbia Sea View', rooms: 3, area: 104, price: 590000, floor: 4, block: 'Квартал Sabbia', view: 'Море', photo: "images/architecture-01.jpg", seed: 14, gal: ['interior-01','interior-02','sunset'], desc: 'Три комнаты и кабинет. Терраса смотрит на море.', feat: ['Терраса', 'Кабинет'] },
    { id: 5, type: 'penthouse', title: 'Penthouse Horizon', rooms: 3, area: 142, price: 1350000, floor: 12, block: 'Башня Horizon', view: 'Панорама моря', photo: "images/architecture-02.jpg", seed: 15, gal: ['interior-01','interior-02','architecture-04','sunset'], desc: 'Квартира на верхних этажах башни с террасой 60 м² и камином.', feat: ['Терраса 60 м²', 'Камин'] },
    { id: 6, type: 'penthouse', title: 'Penthouse Alba', rooms: 4, area: 196, price: 2280000, floor: 14, block: 'Башня Horizon', view: 'Панорама на 270°', photo: "images/sunset.jpg", seed: 16, gal: ['architecture-04','interior-01','interior-02','marina'], desc: 'Угловой пентхаус: бассейн на крыше и две террасы с видом на закат.', feat: ['Бассейн на крыше', 'Две террасы'] },
    { id: 7, type: 'family', title: 'Residence Giardino', rooms: 4, area: 168, price: 1040000, floor: 2, block: 'Парковые виллы', view: 'Сад', photo: "images/architecture-04.jpg", seed: 17, gal: ['architecture-03','central-park','interior-02','interior-01'], desc: 'Дом с собственным садом и гаражом в нескольких шагах от центрального парка.', feat: ['Свой сад', 'Гараж на 2 авто'] },
    { id: 8, type: 'family', title: 'Residence Lido', rooms: 5, area: 214, price: 1480000, floor: 3, block: 'Парковые виллы', view: 'Море и парк', photo: "images/waterfront.jpg", seed: 18, gal: ['marina','sports','interior-01','interior-02'], desc: 'Просторная резиденция с бассейном и гостевым домом рядом с набережной.', feat: ['Бассейн', 'Гостевой дом'] },
    { id: 9, type: 'family', title: 'Residence Pineta', rooms: 3, area: 118, price: 790000, floor: 2, block: 'Парковые виллы', view: 'Сосновая аллея', photo: "images/central-park.jpg", seed: 19, gal: ['architecture-03','interior-01','interior-02'], desc: 'Семейный дом на сосновой аллее с патио и детской зоной.', feat: ['Патио', 'Детская зона'] }
  ],

  lifestyle: [
    { title: 'Рестораны', photo: 'images/restaurant.jpg', text: 'Кухня у воды: от завтраков до поздних ужинов на террасах.', items: ['Sale e Mare — рыба и морепродукты', 'Forno — итальянская пекарня', 'Terrazza — вино и закаты', 'Café Alba — кофе на набережной'] },
    { title: 'Спорт и wellness', photo: 'images/sports.jpg', text: 'Бассейн, спа и залы с панорамным остеклением.', items: ['Бассейн 50 м', 'Теннисные корты', 'Студия йоги', 'Спа и сауны'] },
    { title: 'Набережная', photo: 'images/waterfront.jpg', text: 'Три километра променада из светлого камня.', items: ['Велодорожка и беговая тропа', 'Скамьи и тенистые беседки', 'Кафе и мороженое', 'Фестиваль огней — каждое лето'] },
    { title: 'Парки', photo: 'images/central-park.jpg', text: 'Семь парков и садов — зелень в каждом квартале.', items: ['Центральный парк, 9 га', 'Сад на крыше галереи', 'Сосновая аллея', 'Детские площадки в каждом дворе'] },
    { title: 'Торговая галерея', photo: 'images/shopping.jpg', text: 'Бутики, книжный магазин и рынок под стеклянной крышей.', items: ['Галерея Sabbia', 'Рынок Mercato по выходным', 'Книжный «Берег»', 'Аптека и супермаркет'] },
    { title: 'Марина', photo: 'images/marina.jpg', text: 'Причал на 40 яхт и яхт-клуб с лаунж-зоной.', items: ['Яхт-клуб и школа парусного спорта', 'Вечерние прогулки к закату', 'Кафе над водой', 'Сервис для владельцев яхт'] }
  ],

  intTypes: [{ id: 'all', label: 'Все' }, { id: 'living', label: 'Гостиные' }, { id: 'kitchen', label: 'Кухни' }, { id: 'terrace', label: 'Террасы' }, { id: 'wellness', label: 'Wellness' }],
  interiors: [
    { type: 'living', title: 'Гостиная с видом на закат', text: 'Панорамное остекление и мягкая мебель песочных тонов.', photo: 'images/interior-01.jpg' },
    { type: 'kitchen', title: 'Кухня с мраморным островом', text: 'Скрытая техника, тёплая подсветка и барная зона.', photo: 'images/interior-02.jpg' },
    { type: 'terrace', title: 'Терраса-лаунж', text: 'Открытая гостиная с видом на море.', photo: 'images/architecture-04.jpg' },
    { type: 'terrace', title: 'Вечерняя терраса', text: 'Огни марины и закат над заливом.', photo: 'images/sunset.jpg' },
    { type: 'wellness', title: 'Бассейн и спа', text: 'Тихая вода и мягкий свет для вечернего отдыха.', photo: 'images/sports.jpg' }
  ],

  // Captions for photos shown in galleries (key = file name without extension)
  cap: {
    'architecture-01': 'Фасад с террасами', 'architecture-02': 'Башня на закате', 'architecture-03': 'Двор и сады', 'architecture-04': 'Терраса-лаунж',
    'central-park': 'Парковый двор', 'waterfront': 'Набережная у дома', 'interior-01': 'Гостиная', 'interior-02': 'Кухня', 'sunset': 'Терраса на закате',
    'marina': 'Марина', 'shopping': 'Торговая галерея', 'sports': 'Wellness-зона', 'restaurant': 'Ресторан на террасе', 'hero': 'Район на закате', 'district-aerial': 'Район с высоты'
  }
};
