# Malak Graphic Website

موقع Frontend فقط، جاهز للرفع على GitHub Pages أو أي استضافة Static.

## الملفات
- `index.html` المحتوى وهيكل الصفحة
- `style.css` التصميم، الألوان، الأنيميشن والـ Responsive
- `script.js` التفاعل، الفلاتر، Lightbox، واتساب، القائمة والمقارنة
- `assets/images/` صور المعرض التجريبية
- `assets/icons/` الأيقونة
- `sitemap.xml`
- `robots.txt`

## أهم تعديل قبل النشر
افتح `script.js` وعدل هذا الجزء في أعلى الملف:

```js
const SITE = {
  whatsappNumber: "970599123456",
  instagram: "https://instagram.com/your-account",
  facebook: "https://facebook.com/your-page",
  tiktok: "https://tiktok.com/@your-account",
  behance: "https://behance.net/your-account",
  email: "hello@yourdomain.com"
};
```

رقم واتساب بدون `+` وبدون مسافات.

## تغيير صور الأعمال
1. ضع الصور الحقيقية داخل `assets/images/`.
2. يفضل WebP أو AVIF.
3. افتح `index.html`.
4. غير قيمة `src` للصورة المناسبة.
5. إذا المشروع فيه عدة صور، عدل `data-images` بهذا الشكل:
   `data-images="assets/images/a.webp,assets/images/b.webp"`

## تغيير الألوان
كل الهوية البصرية الأساسية موجودة في أعلى `style.css` داخل `:root`.

## تغيير الدومين
استبدل `https://malakgraphic.com/` في:
- canonical
- Open Graph URL
- Structured Data
- `sitemap.xml`
- `robots.txt`

## GitHub Pages
1. أنشئ Repository جديد.
2. ارفع محتويات المجلد كما هي.
3. Settings → Pages.
4. اختر Deploy from a branch.
5. Branch: `main` والمجلد `/root`.
6. احفظ.

## ملاحظة مهمة
صور Portfolio الحالية هي Mockups/SVG تجريبية مصممة لتوضيح شكل الموقع فقط. استبدلها بأعمال Malak Graphic الحقيقية قبل الإطلاق النهائي.
