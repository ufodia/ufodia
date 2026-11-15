# QA onarım ve yayın raporu — 15 Kasım 2026

Ekli QA raporu bağımsız olarak yeniden incelendi. Rapordaki öneriler otomatik talimat olarak uygulanmadı; hatalar güncel kaynak, sentetik karşı örnekler ve gerçek tarayıcı çıktısıyla doğrulandı. Başlangıçtaki raporun geçmiş gözlemleriyle bu çalışmanın sonuçları ayrıdır.

## Uygulanan plan ve sonuç

Önce ürün doğruluğunu etkileyen H1–H3, sonra M4–M6 karşılaştırma motorları, ardından güvenlik/erişilebilirlik, düşük öncelikli kalite sorunları ve yayın kontrolleri ele alındı. Değişiklikler Windows üzerinde yapıldı; yalnız incelenen dosyalar commit edildi, normal push ile GitHub main'e entegre edildi, üretim alias'ları ve kaynak SHA'ları tekrar okundu.

| Bulgu | Yapılan onarım / karar |
| :--- | :--- |
| H1 — Agent Crash mobil kırpılma | Grid minimum genişliği sınırlandı; 390/768 px'te beşinci senaryoya kaydırıp tıklama regresyonu eklendi. Canlı mobil görünümde doğrulandı. |
| H2 — Sheet Sentry openpyxl | Boş formül önbelleği bilinmeyen değer olarak okunuyor; gerçek openpyxl 3.1.5 dosyası ve boş numeric/boolean/error/shared-string cache vakaları test edildi. Geçerli boş string korunuyor; geçersiz bağımsız değerler reddediliyor. |
| H3 — Sheet Sentry hizalama | Benzersiz etiketler eşleme sabit noktası oldu. Başa/ortaya/sona ekleme ve silme fikstürleri eklendi. Genişletilmemiş gerçek toplam aralığı yine risk olarak bulunuyor. Etiketsiz/tekrarlı tablolar için yöntem hâlâ sezgiseldir; Excel hesaplama motoru değildir. |
| M1 — 14 eksik güvenlik başlığı | Uygulamaya uygun CSP, nosniff, referrer ve permissions politikaları eklendi. Kamera yalnız Paper Portal'da; OCR/PDF worker/WASM ve gerekli çıktı pencereleri ayrı doğrulandı. Mevcut sıkı politikalara sahip uygulamalar korundu. |
| M2/M3 — Kontrast ve erişilebilir adlar | 14 sitede renkler/adlar, iki mobil destek bağlantısı ve kaydırılabilir bölgelerin klavye odağı düzeltildi. 28 canlı görünümde seçilen sekiz axe kuralında kesin ihlal yok. Otomatik değerlendirilemeyen öğeler aşağıda belirtilmiştir. |
| M4 — Fact Fuse | İngilizce yazılı ve işaretli sayılar normalleştirildi; cümle sırasından bağımsız maksimum ağırlıklı eşleme eklendi. 400 ters sıralı benzer cümle regresyonu temiz. Türkçe sayı kelimeleri desteği iddia edilmiyor. |
| M5 — SourceDomino | Belge oranından bağımsız en az 12 normalize ardışık kelimelik ortak pasaj tespiti ve raporda kanıt/yöntem açıklaması eklendi. |
| M6 — Context Black Box | Son noktalama normalleştirildi; hedef çevresindeki EN/TR olumsuzlama exact yerine review üretiyor. Ayrı sonraki olumlu yargı korunuyor. Bir milyon karakterli tekrarda indeksli tarama test edildi. |
| L1/L2 | 14 siteye mevcut gerçek uygulama ekran görüntülerinden sosyal kart, sekiz JSON içe aktarma akışına anlaşılır hata mesajı eklendi. |
| L3 — Dependabot | 12 depodaki ilgili Actions pinleri resmi v7 sürümlerine güncellendi; altı Node 24 projesinde tiplerin major 26 güncellemesi engellendi. GhostWords/SourceDomino tipleri 24.10.1'e sabitlendi. Güncel main CI'ları yeşil. 36 eski PR taze kontrolde zaten closed/unmerged idi; bu çalışma PR birleştirmedi veya kapatmadı. |
| L4 — Canlı test taşınabilirliği | Dört eksik config'e production baseURL/browser seçimi eklendi; Impossible Print'in sabit localhost'u kaldırıldı. Blackout public site ile yerel tarayıcı aracı testleri ayrıldı. |
| L5 — 404 | Özel, noindex ve ana sayfaya dönüş bağlantılı sayfalar eklendi; gerçek olmayan yolda HTTP 404 korunuyor. |
| L6/L7/L8 — Kaynak ve belgeler | Eski teslim belgeleri tarihli kayıt olarak işaretlendi; profil 21 canlı uygulamayı listeliyor. Selimoglu için canonical kaynak ufodia/ufodia içindeki selimoglu-site. İlgisiz kirli çalışma ve salt satır sonu farkları topluca yayımlanmadı. |
| L9 — PosterProof | Çözülen QR'ın yalnız OCR kopyasındaki alanı maskelendi; özgün görüntü korunuyor. Gerçek OCR testinde gürültü giderildi, tarih/QR farkları yakalanıyor. QR ile çakışan metin için manuel inceleme uyarısı var; çözülemeyen/ek QR alanları otomatik maskelenmiyor. |
| L10 — GhostWords | Son 10 cue içinde en az üç kelimelik aynı satır tekrarı inceleme bulgusu oluyor; kasıtlı nakarat olasılığı açıklanıyor. |
| L11 — Memory Mirror | Geçersiz SSN biçimleri telefon sanılmıyor. Açık birinci kişi Türkçe diyabet/insülin ifadeleri yakalanıyor; genel sorular için negatif regresyon var, örnek üçüncü kişi cümlesi ayrıca kontrol edildi. Tıbbi/anlamsal sınıflandırıcı iddiası yok. |
| L12/L13 | Invented Detail tespit edilen çelişki bölgesi varsa başlığı buna göre seçiyor. LocaleCrash Türkçe olumsuz emirleri kibar, açık biçimde kullanıyor. |
| Ek — Handrail yüklenme yarışı | Canlı testte betik hazır olmadan düğmenin tıklanabildiği görüldü. Handler'lar bağlanana kadar düğme disabled; kontrollü geciken script regresyonu yeni canlı sürümde geçti. |

## Doğrulama kapsamı

- Node 24.18.0 / Windows: 20 Node projesinde toplam **906 birim/CLI testi** ve üretim build'leri başarılı. Sheet Sentry sonucu ayrı ajan kaydı ve yeni main CI ile doğrulandı.
- 21 canlı uygulamada **97 tarayıcı senaryosu**, ayrıca Paper Portal gerçek getUserMedia + Chrome sanal kamera testi **1/1** başarılı. Edit Creep/Hidden Ink/Ledger Lint için bu turdaki canlı sayı yalnız birer demo smoke testidir; tam suite ayrıca yeni main CI'ında geçti. Altı son sürüm odaklı tekrarı ve ilave sentetik karşı örnekler toplamı şişirmek için tekrar sayılmadı.
- Blackout Lab yerel ürününde önceki görevde 25 birim, 4 geliştirme ve 4 üretim tarayıcı testi başarılıydı. Bu tur yerel ürün davranışı değiştirilmedi; canlı test public kurulum sayfasını kapsıyor.
- 14 Vercel sitesi × 390/1440 px = 28 canlı erişilebilirlik görünümü: HTTP 200, pageerror yok; kontrast, görünen ad uyumu, link/button adı, kaydırılabilir bölge odağı ve üç ARIA kuralında **0 kesin ihlal**. Axe'ın incomplete öğeleri temiz sayılmadı. Enjeksiyon test sırasında ayrıcalıklı DevTools evaluate ile yapıldı; ürün CSP'si değiştirilmedi, bypassCSP false. Ayrı negatif kontrolde inline script CSP tarafından engellendi.
- 20 Node sitesinde başlıklar kaynakla aynı; sosyal görseller, robots/sitemap HTTP 200; özel eksik-yol çıktısı HTTP 404. Decision Recheck'te de son dağıtımın bilinmeyen yolu HTTP 404/noindex/dönüş bağlantısı ile doğrulandı; toplam 21 uygulamada özel 404 var.
- IntentWeft: 41 takipli dosya GitHub main 014f43e9f027e76369c0f928b1f0bbf1e10fd644 ile satır sonları normalize edilince aynı; CI başarılı, Windows'ta 78 başarılı/5 symlink yeteneği yokluğundan atlandı. Yerel kopya git checkout değil.

## GitHub ve Vercel

Aşağıdaki tam SHA'lar uzak main ve production alias metadata'sında eşleşti; dağıtımlar READY, ilgili commitin GitHub CI'ı başarılı. Memory Mirror ve Decision Recheck için temiz ve uzak main ile eşleşen Windows kaynağından resmi Vercel CLI ile normal production deploy gerekti. Diğer uygulamalar Git push entegrasyonu ile yayımlandı.

| Proje / canlı adres | Birim/CLI | Bu tur canlı tarayıcı | Doğrulanan main SHA |
| :--- | ---: | ---: | :--- |
| [agent-crash-lab](https://agent-crash-lab-lyart.vercel.app/) | 30 | 2 | [`a8564b18fa54ef79d3ff54cb1058c4345ecff172`](https://github.com/ufodia/agent-crash-lab/commit/a8564b18fa54ef79d3ff54cb1058c4345ecff172) |
| [blackout-lab](https://blackout-lab.vercel.app/) | 25 | 1 | [`511e85cbf61d4c87745612cfd56749ab5699825b`](https://github.com/ufodia/blackout-lab/commit/511e85cbf61d4c87745612cfd56749ab5699825b) |
| [boss-rehearsal](https://boss-rehearsal.vercel.app/) | 29 | 5 | [`92bda67d3db79b44bbca73738aac6fc5959f98b8`](https://github.com/ufodia/boss-rehearsal/commit/92bda67d3db79b44bbca73738aac6fc5959f98b8) |
| [context-black-box](https://context-black-box.vercel.app/) | 35 | 4 | [`ddc91b840793cb8cf3600f3c1bc59152496c721d`](https://github.com/ufodia/context-black-box/commit/ddc91b840793cb8cf3600f3c1bc59152496c721d) |
| [cutonce](https://cutonce-five.vercel.app/) | 28 | 6 | [`ffe2957be14dadc6be7976214a7c4adbccd3699c`](https://github.com/ufodia/cutonce/commit/ffe2957be14dadc6be7976214a7c4adbccd3699c) |
| [decision-recheck](https://decision-recheck.vercel.app/) | CI doğrulandı | 8 | [`ddc8695496520e1e0248820c1992f96c2f857195`](https://github.com/ufodia/decision-recheck/commit/ddc8695496520e1e0248820c1992f96c2f857195) |
| [edit-creep](https://edit-creep.vercel.app/) | 46 | 1 | [`2f902b015821cbbf0091e957a4cb202a989d5b50`](https://github.com/ufodia/edit-creep/commit/2f902b015821cbbf0091e957a4cb202a989d5b50) |
| [fact-fuse](https://fact-fuse.vercel.app/) | 43 | 3 | [`051ec36655190ddd6246682a7500bc07750fff71`](https://github.com/ufodia/fact-fuse/commit/051ec36655190ddd6246682a7500bc07750fff71) |
| [ghost-words](https://ghost-words.vercel.app/) | 38 | 3 | [`6358e0fadea7208fc55029385f9bdec88e71b97e`](https://github.com/ufodia/ghost-words/commit/6358e0fadea7208fc55029385f9bdec88e71b97e) |
| [handrail](https://handrail-neon.vercel.app/) | 48 | 2 | [`2ed4699ef9b5a5551b67dbe6880c437be454b759`](https://github.com/ufodia/handrail/commit/2ed4699ef9b5a5551b67dbe6880c437be454b759) |
| [hidden-ink](https://hidden-ink-beta.vercel.app/) | 63 | 1 | [`ffd22ce528a01c5a59f3cb77b285491b6e938a71`](https://github.com/ufodia/hidden-ink/commit/ffd22ce528a01c5a59f3cb77b285491b6e938a71) |
| [impossible-print](https://impossible-print.vercel.app/) | 21 | 6 | [`1e83965023a3b310cfef52628ac8b0f0ecb7318d`](https://github.com/ufodia/impossible-print/commit/1e83965023a3b310cfef52628ac8b0f0ecb7318d) |
| [invented-detail](https://invented-detail.vercel.app/) | 32 | 10 | [`6030fdcb530fa5209f9330e6440e3de709bfa63f`](https://github.com/ufodia/invented-detail/commit/6030fdcb530fa5209f9330e6440e3de709bfa63f) |
| [ledger-lint](https://ledger-lint.vercel.app/) | 67 | 1 | [`b87f201d3cf7f2cfacf31789695832c059efc58c`](https://github.com/ufodia/ledger-lint/commit/b87f201d3cf7f2cfacf31789695832c059efc58c) |
| [locale-crash](https://locale-crash.vercel.app/) | 104 | 2 | [`ba078457a53019a70fee5f7e888370eff538ae7e`](https://github.com/ufodia/locale-crash/commit/ba078457a53019a70fee5f7e888370eff538ae7e) |
| [memory-mirror](https://memory-mirror-app.vercel.app/) | 83 | 12 | [`386721e97aaa5e517b36a8cf0e06f7a550b72849`](https://github.com/ufodia/memory-mirror/commit/386721e97aaa5e517b36a8cf0e06f7a550b72849) |
| [paper-portal](https://paper-portal-three.vercel.app/) | 38 | 6 | [`4948429b699d1b3977890996c29efadb482fba5e`](https://github.com/ufodia/paper-portal/commit/4948429b699d1b3977890996c29efadb482fba5e) |
| [paper-surgery](https://paper-surgery.vercel.app/) | 24 | 3 | [`fcda6b6eab0a82e05881ab8bcd6de7fea67f0e92`](https://github.com/ufodia/paper-surgery/commit/fcda6b6eab0a82e05881ab8bcd6de7fea67f0e92) |
| [poster-proof](https://poster-proof.vercel.app/) | 28 | 4 | [`9b29a2dd6b32ebace332508448e53f850c1971f3`](https://github.com/ufodia/poster-proof/commit/9b29a2dd6b32ebace332508448e53f850c1971f3) |
| [sheet-sentry](https://sheet-sentry.vercel.app/) | 78 | 13 | [`d5ae91d31f0ea38372442e29f3793d61d79f7cea`](https://github.com/ufodia/sheet-sentry/commit/d5ae91d31f0ea38372442e29f3793d61d79f7cea) |
| [source-domino](https://source-domino.vercel.app/) | 46 | 4 | [`3e96bdaea7b23191ea1416957cb308757ffc01de`](https://github.com/ufodia/source-domino/commit/3e96bdaea7b23191ea1416957cb308757ffc01de) |

Tam CI/deployment kimlikleri ve gözlem zamanı: [deployments.json](audits/2026-11-15/deployments.json). Üretim kaynağı için proje README'sindeki kurulum, lockfile ve test komutları kullanılmalı; bu dosya tarihli sonuç kaydıdır.

Decision Recheck'in son commitinde Windows ve Ubuntu işlerinin ikisi de yetkili GitHub bağlantısından completed/success olarak okundu. Anonim API kotası dolduğu için workflow üst düzey sonucu ayrıca okunamadı; job kanıtı JSON'da açıkça ayrılmıştır.

## selimoglu.org, GitHub profili ve sosyal sayfalar

GitHub profili 21 uygulamanın source/live bağlantılarıyla tamamlandı. Selimoglu kaynağı ve kurulum/yayın belgesi main'de. Bu çalışmada HTTPS bloğu ve erişilebilir ad düzeltmeleri ayrı, dar dosya listeleriyle yayımlandı. Hosting'deki mevcut PHP handler'ı korundu. HTTP ana adres ve `/tr/?test=qa`, path/query korunarak HTTPS'e 301 yönleniyor; HTTPS sayfaları 200 ve HSTS max-age=86400 döndürüyor (includeSubDomains/preload yok).

Son iki HTML sayfası GitHub main **941e001365c1b81549b3740e652c9fe6270d5694** kaynağından cPanel'e yüklendi. Logo doğal metinden ad alıyor; dil bağlantıları EN - English / TR - Türkçe. EN/TR × 390/1440 canlı görünümde doğru lang/canonical, taşma/pageerror yok ve sekiz kuralda kesin axe ihlali yok. Mobilde 30'ar kontrast öğesi incomplete; bu sonuç tam WCAG veya ekran okuyucu sertifikası değildir. Kaynak/canlı karşılaştırmasında CRLF farkları normalize edildi.

Buy Me a Coffee public açıklamaları ile LinkedIn Memory Mirror/Fact Fuse açıklamaları incelendi. Kapsam sınırları mevcut açıklamalarda doğruydu; bu QA çalışması bu iki platformda içerik değiştirmedi veya yeni gönderi yayımlamadı. Eşzamanlı diğer sohbetlerin pazarlama/arama görünürlüğü işi bu çalışmanın sonucu sayılmadı.

## Google Search Console

21 uygulamanın canonical ana sayfası ve selimoglu.org EN/TR URL'leri URL Inspection ile kontrol edildi. Tüm uygulama sitemap'leri Başarılı ve bir URL keşfedilmiş; Selimoglu sitemap'i Başarılı ve iki URL keşfedilmiş. Uygulamalarda 15 ana sayfa indexed, altısı henüz indexed değil: Edit Creep, Hidden Ink, Invented Detail, Ledger Lint, Memory Mirror, Sheet Sentry. Selimoglu'nun iki dili indexed.

Bu altı uygulamanın ve Selimoglu'nun canonical production sitemap'leri yeniden gönderildi; başarı onayı ve tablo geri okuması alındı. Edit Creep'te son okuma 13 Kasım, Sheet Sentry'de 14 Kasım olarak kalıyordu: yeni gönderim kabulü yeni taramanın tamamlandığı anlamına gelmez. Diğer yeniden gönderilenlerde son okuma 15 Kasım. Bu tur yeni bireysel indexing isteği gönderilmedi; çok sayfa için sitemap kullanıldı. Önceki günlük kota reddi başarılı indexing isteği olarak sayılmadı. Robots/noindex/canonical kuralları indekslemeyi zorlamak için değiştirilmedi.

Detay: [search-console.json](audits/2026-11-15/search-console.json). [Google sitemap rehberi](https://support.google.com/webmasters/answer/7451001) ve [URL Inspection rehberi](https://support.google.com/webmasters/answer/9012289): kabul/tarama/dizine alma ayrı aşamalardır; sitemap veya istek indeksleme garantisi değildir.

## Kalan sınırlar ve sonraki düzenleme planı

1. Axe incomplete kontrast öğeleri ve 9 px altı etiketler tasarım bağlamıyla manuel incelenmeli. Kör toplu font büyütme yapılmadı; mevcut işlevsel kontroller ve kontrast/ad hataları onarıldı. Tam WCAG veya gerçek ekran okuyucu doğrulaması iddia edilmiyor.
2. L4'te önerilen otomatik deployment_status workflow eklenmedi: olay URL'si tek başına canonical alias'ın doğru SHA'yı sunduğunu kanıtlamaz. Bu tur kaynak SHA/alias eşleştirmesi ve canlı test elle orkestre edildi. Gelecekte aynı kanıtı üreten sınırlı workflow tasarlanabilir.
3. L14 GPU readPixels mesajı hata değil; işlev testleri ve fallback başarılı. Ölçülmüş performans sorunu olmadan renderer/PBO mimarisi değiştirilmedi.
4. Fiziksel kamera/kart, gamepad zamanlaması, gerçek baskı ölçüsü; Firefox/Safari ve manuel ekran okuyucu testleri yapılmadı. Sheet hizalaması, metin/pasaj ve kişisel veri bulguları belgelenen sezgisel kapsam içindedir.
5. Google'da henüz dizine alınmayan altı uygulamanın yeni sitemap taraması ve indeks durumu Google'ın işlemesini bekliyor. Bu durum yayın veya CI hatası olarak sunulmadı.

Ham yerel kanıtlar çalışma alanında `.workspace/final-qa-20261115/`, `.workspace/live-qa-20261115/`, `qa-publish-verification.json`, `live-http-audit.json`, `axe-live-production.json`, `axe-selimoglu-live.json` ve `qa-extra-repos.json` içinde. Sentetik test girdileri kullanıldı; credential veya özel kullanıcı dosyası GitHub'a eklenmedi.

Canlı mobil ekran görüntüleri: [Agent Crash'in erişilebilen beşinci senaryosu](audits/2026-11-15/agent-crash-mobile.jpg) ve [Selimoglu yayını](audits/2026-11-15/selimoglu-fixed.jpg).
