const items = {
  orange: { id: "orange", name: "Orange Cat", group: "cats", category: "แมว", maker: "Little Paws", makerLabel: "คอลเลกชัน", caption: "เจ้าส้มจอมซน", description: "แมวแต่ละตัวมีเสน่ห์และความน่ารักในแบบของตัวเอง", story: "เจ้าส้มจอมซน เป็นหนึ่งในเหล่าแมวเหมียวที่อยากเก็บความน่ารักเอาไว้ใน Little Paws ♡", image: "assets/images/cats/photos/cat5.jpg", related: ['white', 'black'] },
  white: { id: "white", name: "White Cat", group: "cats", category: "แมว", maker: "Little Paws", makerLabel: "คอลเลกชัน", caption: "ก้อนเมฆตัวน้อย", description: "แมวแต่ละตัวมีเสน่ห์และความน่ารักในแบบของตัวเอง", story: "ก้อนเมฆตัวน้อย เป็นหนึ่งในเหล่าแมวเหมียวที่อยากเก็บความน่ารักเอาไว้ใน Little Paws ♡", image: "assets/images/cats/photos/cat6.jpg", related: ['black', 'calico'] },
  black: { id: "black", name: "Black Cat", group: "cats", category: "แมว", maker: "Little Paws", makerLabel: "คอลเลกชัน", caption: "เจ้าเงาตาแป๋ว", description: "แมวแต่ละตัวมีเสน่ห์และความน่ารักในแบบของตัวเอง", story: "เจ้าเงาตาแป๋ว เป็นหนึ่งในเหล่าแมวเหมียวที่อยากเก็บความน่ารักเอาไว้ใน Little Paws ♡", image: "assets/images/cats/photos/cat7.jpg", related: ['calico', 'tabby'] },
  calico: { id: "calico", name: "Calico Cat", group: "cats", category: "แมว", maker: "Little Paws", makerLabel: "คอลเลกชัน", caption: "สามสีแสนสดใส", description: "แมวแต่ละตัวมีเสน่ห์และความน่ารักในแบบของตัวเอง", story: "สามสีแสนสดใส เป็นหนึ่งในเหล่าแมวเหมียวที่อยากเก็บความน่ารักเอาไว้ใน Little Paws ♡", image: "assets/images/cats/photos/cat8.jpg", related: ['tabby', 'fluffy'] },
  tabby: { id: "tabby", name: "Tabby Cat", group: "cats", category: "แมว", maker: "Little Paws", makerLabel: "คอลเลกชัน", caption: "เจ้าเสือน้อย", description: "แมวแต่ละตัวมีเสน่ห์และความน่ารักในแบบของตัวเอง", story: "เจ้าเสือน้อย เป็นหนึ่งในเหล่าแมวเหมียวที่อยากเก็บความน่ารักเอาไว้ใน Little Paws ♡", image: "assets/images/cats/photos/cat9.jpg", related: ['fluffy', 'orange'] },
  fluffy: { id: "fluffy", name: "Fluffy Cat", group: "cats", category: "แมว", maker: "Little Paws", makerLabel: "คอลเลกชัน", caption: "ก้อนขนเดินได้", description: "แมวแต่ละตัวมีเสน่ห์และความน่ารักในแบบของตัวเอง", story: "ก้อนขนเดินได้ เป็นหนึ่งในเหล่าแมวเหมียวที่อยากเก็บความน่ารักเอาไว้ใน Little Paws ♡", image: "assets/images/cats/photos/cat10.jpg", related: ['orange', 'white'] },
};
const itemId = new URLSearchParams(window.location.search).get('id') || 'orange';
const item = items[itemId] || null;
function showDetail(item) {
  document.title = item.name + ' | Little Paws';
  document.querySelectorAll('[data-field]').forEach(function (el) { el.textContent = item[el.dataset.field] || ''; });
  const image = document.querySelector('#detail-image'); image.src = item.image; image.alt = item.name;
}
function showRelated(item) { item.related.forEach(function (id, index) { const related = items[id]; const suffix = index === 0 ? '' : '-2'; document.querySelector('#related-link' + suffix).href = 'detail.html?id=' + id; document.querySelector('#related-image' + suffix).src = related.image; document.querySelector('#related-name' + suffix).textContent = related.name; document.querySelector('#related-caption' + suffix).textContent = related.caption; }); }
if (item) { showDetail(item); showRelated(item); } else { document.querySelector('#detail-content').hidden = true; document.querySelector('#not-found').hidden = false; }
