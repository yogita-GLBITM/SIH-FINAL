const img=(id,w=1800)=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=88`;
// Guaranteed-good fallback so a single dead photo id never breaks a layout.
export const FALLBACK_IMG=img('1464822759023-fed622ff2c3b',1800);

export const STATES=[
{id:'assam',name:'Assam',tag:'Brahmaputra • Tea country • Kaziranga',accent:'#f6c453',
hero:img('1593693411515-c20261bcad6e'),gems:[
['Majuli Island','Jorhat',img('1500534623283-312aade485b7',1400),'River island culture, satras and mask-making traditions along the Brahmaputra.'],
['Haflong','Dima Hasao',img('1506905925346-21bda4d32df4',1400),'Assam’s hill country of forested ridges, mist and a slower mountain rhythm.'],
['Kakochang Waterfall','Golaghat',img('1503435980610-a51f3ddfee50',1400),'A forest waterfall near Kaziranga reached by a short nature trail.']]},

{id:'arunachal',name:'Arunachal Pradesh',tag:'Himalayas • Monasteries • First light',accent:'#ff7a45',
hero:img('1508739773434-c26b3d09e071'),gems:[
['Ziro Valley','Lower Subansiri',img('1500534314209-a25ddb2bd429',1400),'Apatani villages, rice fields and pine-covered hills in a distinctive cultural landscape.'],
['Sela Lake','Tawang',img('1513836279014-a89f7a76ae86',1400),'A high-altitude mountain landscape surrounded by stark Himalayan ridgelines.'],
['Mechuka','Shi-Yomi',img('1518002171953-a080ee817e1f',1400),'A remote valley feeling of wooden homes, rivers and broad alpine views.']]},

{id:'meghalaya',name:'Meghalaya',tag:'Cloud country • Living roots • Waterfalls',accent:'#2bd4b0',
hero:img('1441974231531-c6227db76b6e'),gems:[
['Nongriat','East Khasi Hills',img('1500336624523-d727130c3328',1400),'A forest village associated with Meghalaya’s living root bridge tradition.'],
['Mawlynnong','East Khasi Hills',img('1517685633167-40e28e7c86e3',1400),'A green Khasi village known for community-led cleanliness and bamboo structures.'],
['Laitlum Canyon','Near Shillong',img('1469474968028-56623f02e42e',1400),'A dramatic highland viewpoint where Khasi hills dissolve into cloud.']]},

{id:'manipur',name:'Manipur',tag:'Loktak • Sangai • Hills',accent:'#ff5da2',
hero:img('1447069387593-a5de0862481e'),gems:[
['Loktak Lake','Bishnupur',img('1501785888041-af3ef285b470',1400),'A lake landscape evoking Manipur’s floating phumdis and open water horizons.'],
['Andro','Imphal East',img('1522199755839-a2bacb67c546',1400),'A cultural-route mood for traditional crafts, food and community history.'],
['Shirui Hills','Ukhrul',img('1470252649378-9c29740c9fa8',1400),'Highlands associated with the Shirui lily and cool mountain walks.']]},

{id:'mizoram',name:'Mizoram',tag:'Blue mountains • Bamboo • Ridge roads',accent:'#7c6cff',
hero:img('1519681393784-d120267933ba'),gems:[
['Reiek','Near Aizawl',img('1500530855697-b586d89ba3ee',1400),'A mountain viewpoint mood above Aizawl with wide forested-ridge views.'],
['Phawngpui','Lawngtlai',img('1476514525535-07fb3b4ae5f1',1400),'A high mountain landscape representing Mizoram’s protected forest country.'],
['Hmuifang','Aizawl district',img('1441716844725-09cedc13a4e7',1400),'A peaceful hill destination surrounded by greenery and forest trails.']]},

{id:'nagaland',name:'Nagaland',tag:'Naga villages • Hornbill • High valleys',accent:'#ffb020',
hero:img('1464278533981-50106e6176b1'),gems:[
['Dzukou Valley','Kohima region',img('1464822759023-fed622ff2c3b',1400),'A high valley atmosphere of grasslands and seasonal flowers reached by trekking routes.'],
['Khonoma','Kohima district',img('1465146344425-f00d5f5c8f07',1400),'A historic village mood known for terrace farming, forests and conservation.'],
['Kisama Heritage Village','Kohima',img('1511497584788-876760111969',1400),'A cultural route inspired by traditional Naga architectural landscapes.']]},

{id:'tripura',name:'Tripura',tag:'Rudrasagar • Rock reliefs • Hill orchards',accent:'#ff6f61',
hero:img('1470770903676-69b98201ea1c'),gems:[
['Neermahal','Rudrasagar Lake',img('1524492412937-b28074a5d7da',1400),'A waterside royal-landscape mood inspired by Tripura’s lake-palace setting.'],
['Unakoti','Kailashahar',img('1506461883276-594a12b11cf3',1400),'A forest-and-rock landscape for the archaeological world of Unakoti.'],
['Jampui Hills','North Tripura',img('1447752875215-b2761acb3c5d',1400),'Tripura’s high hill country, associated with orange orchards and misty viewpoints.']]},

{id:'sikkim',name:'Sikkim',tag:'Kanchenjunga • Monasteries • Alpine lakes',accent:'#38bdf8',
hero:img('1502786129293-79981df4e689'),gems:[
['Tsomgo Lake','East Sikkim',img('1439853949127-fa647821eba0',1400),'A high-altitude lake landscape surrounded by rugged Himalayan slopes.'],
['Rumtek Monastery','Near Gangtok',img('1500375592092-40eb2168fd21',1400),'A Himalayan cultural-route mood around forested hills and monastery architecture.'],
['Yuksom','West Sikkim',img('1432405972618-c60b0225b8f9',1400),'A quiet mountain-settlement mood for trails, monasteries and the Kanchenjunga landscape.']]}
];

export const HERO_SLIDES=STATES.map(s=>({state:s.name,img:s.hero,tag:s.tag,accent:s.accent}));

// Deterministic mock weather per state, incl. an animatable `type` used by
// the weather widget (sun / rain / cloud / snow / storm) — swap for a live
// API once the backend is wired up.
const WEATHER_TYPES=['sun','rain','cloud','snow','storm'];
const WEATHER_LABELS={sun:'Clear mountain skies',rain:'Monsoon showers',cloud:'Low cloud cover',snow:'Fresh snow above the tree line',storm:'Thunder rolling through the valley'};
const WEATHER_ICONS={sun:'☀️',rain:'🌧️',cloud:'☁️',snow:'❄️',storm:'⛈️'};
export function getWeather(stateId){
  let hash=0; for(let i=0;i<stateId.length;i++) hash=(hash*31+stateId.charCodeAt(i))%997;
  const highAltitude=stateId==='sikkim'||stateId==='arunachal';
  let type=WEATHER_TYPES[hash%5];
  if(type==='storm'&&!highAltitude) type='rain';
  if(highAltitude&&hash%7===0) type='snow';
  return {
    type,
    label:WEATHER_LABELS[type],
    icon:WEATHER_ICONS[type],
    tempC:type==='snow'?(hash%6)-2:10+(hash%16),
    humidity:55+(hash%35),
    wind:4+(hash%18),
    uv:type==='sun'?4+(hash%7):1+(hash%3),
  };
}
