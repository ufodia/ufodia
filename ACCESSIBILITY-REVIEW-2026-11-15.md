# Erişilebilirlik takip incelemesi — 15–16 Kasım 2026

**Durum: 21 uygulamanın onarım, CI, GitHub main ve Vercel doğrulaması tamamlandı. Gerçek NVDA görev akışları, Selimoglu hosting yüklemesi ve yeni Search Console kontrolü bağlantı engeli nedeniyle tamamlanamadı.** Bu rapor önceki [QA onarım raporunun](QA-REMEDIATION-2026-11-15.md) tarihli devamıdır. Önceki raporun test sayıları ve SHA kayıtları geçmiş gözlemler olarak korunur.

21 uygulamanın incelenen erişilebilirlik engelleri onarıldı. Değişikliklerin GitHub `main` sürümleri, başarılı CI çalışmaları ve Vercel production dağıtımları eşleştirildi; aynı canlı adreslerde **161/161 tarayıcı testi başarılı** oldu. Bu sayı tam WCAG uygunluk beyanı değildir. **WCAG uygunluğu: NOT DETERMINED.** Gerçek tarayıcı yakınlaştırması 48 örnek durumda doğrulandı; gerçek ekran okuyucu görev akışları tamamlanmış sayılmaz. [Makine okunur kanıt ve kaynak kayıtları](audits/2026-11-15/accessibility/review-evidence.json) ayrıntılı zamanları, SHA ve kapsamı içerir.

## Kapsam ve yöntem

Hedef, örneklenen tam akışlarda ilgili WCAG 2.2 A/AA ölçütlerini incelemekti: demo/içe aktarma, rapor oluşturma, bulgu inceleme, form düzenleme, seçim, dışa aktarma ve iletişim kutuları. Her uygulamanın her olası belge biçimi ve durum birleşimi kapsanmadı.

- Windows / Node 24.18.0 üzerinde kaynak ve semantik yapı incelemesi, axe bulgularının ayrıntılı değerlendirilmesi ve izole Chrome ile gerçek `Tab`, `Shift+Tab`, `Enter`, `Space`, ok tuşu, `Home`, `End` ve `Escape` olayları kullanıldı. Bunlar betikli klavye testleridir; insan ekran okuyucu oturumu olarak sunulmaz.
- 1280/1440, 640 ve 320 CSS piksel genişliklerinde yeniden akış; görünür odak, yatay taşma, klavyeyle ulaşılan hedef ve silme/filtreleme sonrası odak dönüşü incelendi. 640/320 genişlikleri, 1280 genişliğin %200/%400 yakınlaştırma karşılığıdır; tarayıcı menüsünden gerçek yakınlaştırma yapıldığı anlamına gelmez.
- `forced-colors: active` ve `prefers-reduced-motion: reduce` Chrome emülasyonu, hesaplanan stiller ve ekran görüntüleriyle kontrol edildi. Bu kontroller, Windows yüksek karşıtlık temasının bütün sistemle gerçek kullanım testinin yerini tutmaz.
- axe'ın `incomplete` çıktıları otomatik olarak başarılı sayılmadı. Gradyan, SVG örtüşmesi, sözde öğeler, kısa metin, dekoratif işaret ve bilinçli gizli etiketler ayrı değerlendirildi. Taramaların kural kapsamları farklıdır: önceki seçili sekiz kural ile tam WCAG etiketli taramalar tek bir tam-kapsam sonucu gibi birleştirilmedi.
- Canlı testlerde uygulamanın gerçek CSP'si korundu. Tarama araçlarının test bağlamına eklenmesi ürünün güvenlik politikasını gevşeten bir değişiklik değildi.

Yöntem ve ölçüt yorumları [WCAG 2.2](https://www.w3.org/TR/WCAG22/) ve sekme davranışı için [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) ile karşılaştırıldı. [WCAG uygunluk koşulları](https://www.w3.org/TR/WCAG22/#conformance-reqs) bütün sayfaların ve tamamlanmış süreçlerin değerlendirilmesini gerektirir; örneklenen testlerin geçmesi bütün site uygunluğunu kanıtlamaz.

## Onarım planı ve uygulanan değişiklikler

Öncelik sırası, klavye ile görevi tamamlamayı engelleyen hatalar; odak ve durum bildirimi; kontrast; dar görünüm; ardından regresyon ve canlı doğrulamaydı. Yalnız doğrulanan engellere yönelik değişiklikler yapıldı.

| Doğrulanan engel / etki | Uygulamalar | Ölçüt ve önem | Onarım ve yeniden test |
| --- | --- | --- | --- |
| Yeniden çizilen form veya inceleme düğmesi odağı `BODY`'ye düşürüyordu; düzenleme sonrası Tab hedefi kayboluyordu. | Boss Rehearsal, Cutonce, Context Black Box, Fact Fuse, Ghost Words, yerel Blackout Lab, Impossible Print, Paper Portal, Source Domino, Poster Proof ve altı belge analiz uygulaması | 2.1.1 Keyboard; 2.4.3 Focus Order — ciddi/orta, akışa göre | Kararlı kontrol kimlikleri, mantıklı silme/filtreleme hedefi ve geciktirilmiş odak dönüşü eklendi. İleri/geri Tab, kimliksiz destek bağlantısı, geçici disabled alan ve doğal sayfa sınırından çıkış karşı örnekleriyle yeniden test edildi. |
| İletişim kutusunu açan öğe yeniden çizilince kapatmada odak dönmüyordu. | Boss Rehearsal, yerel Blackout Lab, Locale Crash | 2.4.3 Focus Order — orta | Güncel açıcı tekrar bulunuyor; Escape ve kapat düğmesi test edildi. |
| Kırpılmış dosya girdisine odak geliyordu fakat görünür yükleme etiketi odak göstermiyordu. | Context Black Box, Paper Surgery | 2.4.7 Focus Visible — orta/ciddi | Görünür ilişkili etikete belirgin odak çerçevesi; boyut ve odak stili regresyonu. |
| Handrail kurulum komutu dar görünümde klavyeyle kaydırılamıyordu. | Handrail web | 2.1.1 Keyboard; 2.4.7 Focus Visible — ciddi | Adlandırılmış, odaklanabilir komut bölgesi; Tab/sağ ok/Tab ile kaydırma ve çıkış testi. |
| Gerçek eklenti açılır penceresinde rehber seçimi; sayfa katmanında duraklat/devam et odağı kayboluyordu. | Handrail Chrome eklentisi | 2.4.3 Focus Order — ciddi | Kontrol kimlikleri korundu. Başka sayfa kontrolüne veya tarayıcı yüzeyine geçildiğinde odak geri çalınmıyor; gerçek eklentiyle 8 test geçti. |
| Canvas alan seçimi yalnız sürüklemeyle yapılabiliyordu. | Edit Creep, Invented Detail | 2.1.1 Keyboard; 2.5.7 Dragging Movements — ciddi | Aynı alanı tanımlayan yerel x/y/genişlik/yükseklik alanları, sınır doğrulama, uygula düğmesi ve sonuç bildirimi. Klavye girdisi gerçek maske/odak çıktısını değiştiriyor. |
| 3B bakış yönü ve yakınlık yalnız işaretçiyle değişiyordu. | Impossible Print | 2.1.1 Keyboard — ciddi | Altı adlandırılmış yerel kamera düğmesi ve canvas grubunda oklarla döndürme, +/- yakınlaştırma; Enter/Space görüntü değişimi ve Tab ile çıkış testi. WebGL desteklenmediğinde fallback akışı da canlı suite içinde geçti. |
| Sekmelerde ok/Home/End ve tek aktif Tab durağı eksikti. | Invented Detail, Sheet Sentry | 2.1.1 Keyboard; 4.1.2 Name, Role, Value — orta | Sekme/panel ilişkileri, yön tuşları ve roving tabindex; 320px görünüm dahil test. |
| İnceleme/seçim durumu yalnız görsel sınıfla belirtiliyordu; bazı eylemler belirsiz simgelere dayanıyordu. | Ghost Words, Locale Crash; ilgili seçili kontroller | 4.1.2 Name, Role, Value — orta | `aria-pressed`, görünür Play metni ve kararlı durum alanları. Dekoratif simgeler bitişik anlamlı metni tekrar etmiyor. |
| Durum canlı bölgesi her çizimde yeniden oluşturuluyordu. | Impossible Print, Paper Portal | 4.1.3 Status Messages — orta | Çizim kökünün dışında tek kararlı status düğümü; DOM kimliği test edildi. Gerçek sesli duyuru sonucu aşağıdaki AT oturumunu bekliyor. |
| Yanlış liste/rol ilişkileri ve adsız iletişim kutuları vardı. | Hidden Ink, Ledger Lint, Decision Recheck, Source Domino, Locale Crash, Paper Portal | 1.3.1 Info and Relationships; 4.1.2 Name, Role, Value — orta/küçük | `dt/dd` için `dl`, uygun şekil/grup rolleri, görünür başlığa bağlı dialog adları. İlgili axe bulguları yeniden tarandı. |
| Zaman çizelgesinin dar görünümdeki küçük SVG etiketleri aylık değerleri yeterince sunmuyordu. | Memory Mirror | 1.1.1 Non-text Content; 1.4.4 Resize Text — orta | Klavyeyle açılabilen yerel veri tablosu, açıklama ve satır/sütun başlıkları; bilinen demo ayı/verisi test edildi. |
| Seçim değişirken eski analiz raporu indirilebiliyordu. | Invented Detail | 4.1.3 Status Messages — orta | Güncelleme durumu gösteriliyor; hesaplama bitene kadar dışa aktarma kapalı, hata halinde önceki seçenekler geri geliyor. Çıktının seçilen analiz modu olduğu test edildi. |
| 340px minimum gövde veya sekme satırı 320px'te sayfayı taşıyordu; senaryo şeridi iç yatay kaydırma istiyordu. | Boss Rehearsal, Cutonce, yerel Blackout Lab, Impossible Print, Paper Portal, Invented Detail; Agent Crash Lab | 1.4.10 Reflow — orta | 320px düzen, başlık/sekme sarma; Agent senaryoları dar görünümde grid. Beşinci senaryo ve son sekme klavyeyle erişilebilir. |
| Gerçek metin kontrast sorunları, SVG/gradyan/short-text istisnalarının arkasında kalmıştı. | Agent Crash Lab, Blackout Lab, Boss Rehearsal, Cutonce, Handrail, Paper Portal, Source Domino, Ledger Lint | 1.4.3 Contrast (Minimum); grafik çizgilerinde 1.4.11 Non-text Contrast — orta | Aşağıdaki gerçek renk çiftleri ölçüldü ve onarıldı. SVG için arka plandaki gerçek dolgu ve grafik eşikleri kullanıldı. |
| Zorlanmış renklerde seçili durumu anlatan dolgu kayboluyordu veya SVG metni sabit renkte kalıyordu. | Agent Crash Lab, Blackout Lab, Boss Rehearsal, Cutonce, Ghost Words, Handrail, Impossible Print, Locale Crash, Paper Portal, Paper Surgery, Source Domino | 1.4.1 Use of Color; 1.4.11 Non-text Contrast — orta | Sistem rengiyle seçili çerçeveler, grafik dolgu/metin eşlemesi; emülasyon ve görüntü incelemesi. |

Bazı işlevsel düğme ve açıklamalar 11–12px'e getirildi. Bu, okunabilirlik iyileştirmesidir; WCAG için genel bir minimum yazı boyutu kuralı iddia edilmiyor. Dekoratif çizim yazıları topluca büyütülmedi.

## Kontrast ve otomatik değerlendirilemeyen öğeler

Normal metin için 4,5:1; gerçekten büyük metin ve gerekli grafik/arayüz göstergeleri için ilgili 3:1 eşiği kullanıldı. Dekoratif, etkin olmayan veya logotip öğeler ancak kullanım ve semantik bağlamı incelendikten sonra ayrı tutuldu.

| Örneklenen gerçek sorun | Önce | Onarımdan sonra |
| --- | ---: | ---: |
| Agent Crash bağlantı açıklaması, desenin en koyu arka plan sınırına karşı | 3,07:1 | 5,48:1 |
| Blackout public “NOT A LIVE TEST” | 3,09:1 | 6,28:1 |
| Blackout SVG “AN ORIGIN” | 3,87:1 | 6,20:1 |
| Blackout yerel URL protokolü / origin sayısı / capture hostname | 3,35 / 3,90 / 4,01:1 | 7,17 / 6,71 / 5,65:1 |
| Boss seçili olmayan zaman çizelgesi numarası | 3,09:1 | 7,46:1 |
| Cutonce parça sayacı | 3,93:1 | 5,48:1 |
| Handrail kurulum adımı / örnek sayacı | 2,43 / 2,61:1 | 5,20 / 4,66:1 |
| Paper Portal kısa kural kimliği | 2,02:1 | 5,52:1 |
| Ledger Lint beyaz hata numarası | 3,91:1 | Koyu hata rozeti ve açık metin; render edilmiş piksel ölçümü eşiği geçti. |

İnceleme kararları:

- Edit Creep, Hidden Ink, Invented Detail, Ledger Lint, Memory Mirror, Sheet Sentry ve Decision Recheck demo raporlarında 1440/320px toplam **530 öğe/durum** incelendi: **500 ölçülmüş başarılı durum ve 30 dekoratif muaf** (Edit Creep 10, Sheet Sentry 2, Decision Recheck 18). Son kayıt **0 doğrulanmış başarısız / 0 çözülmemiş** durum içeriyor. Bu 530, bütün sitelerin bütün metinleri veya 530 ayrı WCAG ihlali anlamına gelmez. Metin ink piksellerinin renk/kenar yumuşatma kapsamı kontrol edildi; tam sayfa koordinat uyuşmazlıkları doğrudan öğe görüntüleriyle tekrar ölçüldü.
- Handrail, Impossible Print, Locale Crash, Paper Portal, Paper Surgery, Poster Proof ve Source Domino'nun üç genişlikteki **133 incomplete düğüm/görünüm kaydı** tek tek sınıflandırıldı. Sebepler: 36 `nonBmp`, 28 `pseudoContent`, 50 `bgOverlap`, 7 `bgGradient`, 9 `shortTextContent`, 3 `imgNode`. Aynı öğenin farklı genişliklerdeki kayıtları ayrı kayıttır. Yalnız bir ikon olduğu gerekçesiyle işlevsel numaralar muaf sayılmadı; gerçek hatalar düzeltildi.
- Agent Crash'te desenli arka plan sınırları; Blackout'ta gradyan uçları ve gerçek SVG panelleri; Boss'ta sözde öğe arkasındaki düz renk; Cutonce'da altı parça dolgusunun tamamı değerlendirildi. Cutonce boyut etiketlerinde en düşük ölçülen oran 4,68:1. Yerel Blackout'un kalan gradyan etiketleri her iki uçta da geçti; en düşük çift 5,34:1.
- Bilinçli `sr-only` etiket ile yanlışlıkla kırpılmış görünür içerik ayrıldı. Context/Paper Surgery dosya girdilerinin görünür odak sorunu gerçekten onarıldı. Fact Fuse logotipi ve bitişik metni tekrar eden ok/ayraçlar dekoratif olarak sınıflandırıldı. Ghost Words belirsiz oynatma simgesi görünür Play metnine çevrildi.
- Source Domino'nun grafik açıklamalarında 5,59:1 ve 7,39:1; başlıklarda 9,56:1 ve 12,09:1; ilişki çizgilerinde 4,25:1 ve 4,55:1 ölçüldü. Impossible Print'in FLOOR/WALL etiketleri gerçek çokgen dolgularında 4,75:1 ve 5,24:1. Böylece SVG “arka plan bulunamadı” çıktısı doğrudan başarılı kabul edilmedi.

## Test sonuçları ve sayım

| Kontrol | Sonuç | Sayım sınırı |
| --- | ---: | --- |
| 20 Node projesi birim/CLI testleri | **906 başarılı** | 228 + 309 + 369; aynı testin tekrar çalışması yeniden sayılmadı. |
| Node production build | **20 başarılı** | Decision Recheck ayrı statik/Python projesidir. |
| 21 canonical production adreste tarayıcı suite'leri | **161/161 başarılı** | 36 + 43 + 74 + Decision Recheck 8; gerçek production CSP ile. |
| Blackout gerçek yerel scanner | **6 geliştirme + 6 production başarılı** | Yalnız loopback demo/sentetik hedefler; 161 canlı web toplamına dahil değil. |
| Handrail gerçek Chrome eklentisi | **8/8 başarılı** | Web sayfası testlerinden ve 161 toplamından ayrı. |
| Yayımlanan Handrail eklenti ZIP'i | **HTTP 200, 12/12 üye byte düzeyinde birebir** | Yerel güncel build ile bütün üyelerin SHA256 karşılaştırması. |
| İncelenen reflow durumları | **320/640px ve gerçek %200/%400 zoom örneklerinde sayfa taşması yok** | 24 yüzeyde 48 native browser zoom durumu; aşağıdaki kapsam ve yöntem. |
| Örneklenen son axe durumları | **0 kesin ihlal** | Yalnız çalıştırılan kural ve durum kapsamı; incomplete değerlendirmeleri yukarıda. |

## GitHub main, CI ve Vercel yayın kanıtı

Yayın/CI ve canlı suite kayıtları 15–16 Kasım 2026 Europe/Istanbul aralığında tamamlandı; her projenin gözlem zamanı bağlı JSON kaydındadır. Aşağıdaki 21 uzak `main` SHA'sı, canonical adresin ulaştığı **READY production** dağıtımının kaynak metadata'sıyla eşleşiyor. Her satırın aynı SHA'sı için GitHub push CI sonucu başarılı. Decision Recheck'te taze okumada current-main Git dağıtımı bulunmadığından, temiz ve uzak main ile eşleşen Windows kaynağı normal resmi CLI production deploy ile yayımlandı; proje ayarı değiştirilmedi.

| Proje / canonical canlı adres | Canlı tarayıcı | Doğrulanan tam main SHA | Aynı SHA için CI |
| --- | ---: | --- | --- |
| [agent-crash-lab](https://agent-crash-lab-lyart.vercel.app/) | 3 | [`7a4102ec0d71e202e1f1a83db48e189440318067`](https://github.com/ufodia/agent-crash-lab/commit/7a4102ec0d71e202e1f1a83db48e189440318067) | [Başarılı](https://github.com/ufodia/agent-crash-lab/actions/runs/43759185415) |
| [blackout-lab](https://blackout-lab.vercel.app/) | 2 | [`9184582149a51b743d5c1c5ea1c6b7c29fc6bfa5`](https://github.com/ufodia/blackout-lab/commit/9184582149a51b743d5c1c5ea1c6b7c29fc6bfa5) | [Başarılı](https://github.com/ufodia/blackout-lab/actions/runs/43762633717) |
| [boss-rehearsal](https://boss-rehearsal.vercel.app/) | 7 | [`7c5cbe96a7356b25461ea351fd26b09be7606377`](https://github.com/ufodia/boss-rehearsal/commit/7c5cbe96a7356b25461ea351fd26b09be7606377) | [Başarılı](https://github.com/ufodia/boss-rehearsal/actions/runs/43762419221) |
| [context-black-box](https://context-black-box.vercel.app/) | 6 | [`3cc806726265d40f6fe490bff723b95b139c0692`](https://github.com/ufodia/context-black-box/commit/3cc806726265d40f6fe490bff723b95b139c0692) | [Başarılı](https://github.com/ufodia/context-black-box/actions/runs/43763571332) |
| [cutonce](https://cutonce-five.vercel.app/) | 8 | [`7706d973e878cdbdc7dd31598992b094f2d98ef4`](https://github.com/ufodia/cutonce/commit/7706d973e878cdbdc7dd31598992b094f2d98ef4) | [Başarılı](https://github.com/ufodia/cutonce/actions/runs/43762429074) |
| [decision-recheck](https://decision-recheck.vercel.app/) | 8 | [`310b42082c302cbd7866ac388ddb83dacb0610a6`](https://github.com/ufodia/decision-recheck/commit/310b42082c302cbd7866ac388ddb83dacb0610a6) | [Başarılı](https://github.com/ufodia/decision-recheck/actions/runs/43759342150) |
| [edit-creep](https://edit-creep.vercel.app/) | 11 | [`c420ba2ae9962017a30b28b0529bb93fd3c15054`](https://github.com/ufodia/edit-creep/commit/c420ba2ae9962017a30b28b0529bb93fd3c15054) | [Başarılı](https://github.com/ufodia/edit-creep/actions/runs/43759341553) |
| [fact-fuse](https://fact-fuse.vercel.app/) | 5 | [`dd8bafacba91dcb5ddc1e8b49f986c87ea9dd2b9`](https://github.com/ufodia/fact-fuse/commit/dd8bafacba91dcb5ddc1e8b49f986c87ea9dd2b9) | [Başarılı](https://github.com/ufodia/fact-fuse/actions/runs/43763585178) |
| [ghost-words](https://ghost-words.vercel.app/) | 5 | [`eb1871dd9449eddb32ea6d541ce9ded8929be58c`](https://github.com/ufodia/ghost-words/commit/eb1871dd9449eddb32ea6d541ce9ded8929be58c) | [Başarılı](https://github.com/ufodia/ghost-words/actions/runs/43763192690) |
| [handrail](https://handrail-neon.vercel.app/) | 3 | [`d2dcef8219fbe6ff9e2cd5ceb33b34f3d5ea9099`](https://github.com/ufodia/handrail/commit/d2dcef8219fbe6ff9e2cd5ceb33b34f3d5ea9099) | [Başarılı](https://github.com/ufodia/handrail/actions/runs/43758947372) |
| [hidden-ink](https://hidden-ink-beta.vercel.app/) | 11 | [`230f17acf0cfc84abe3f26998c695eb0e1c60819`](https://github.com/ufodia/hidden-ink/commit/230f17acf0cfc84abe3f26998c695eb0e1c60819) | [Başarılı](https://github.com/ufodia/hidden-ink/actions/runs/43759341184) |
| [impossible-print](https://impossible-print.vercel.app/) | 13 | [`00e9eb09fbfccb4b16e798765aa0de52ddd2b31c`](https://github.com/ufodia/impossible-print/commit/00e9eb09fbfccb4b16e798765aa0de52ddd2b31c) | [Başarılı](https://github.com/ufodia/impossible-print/actions/runs/43762011605) |
| [invented-detail](https://invented-detail.vercel.app/) | 11 | [`148b6e97ac324692860ffdb7bb76bbcb697d4eac`](https://github.com/ufodia/invented-detail/commit/148b6e97ac324692860ffdb7bb76bbcb697d4eac) | [Başarılı](https://github.com/ufodia/invented-detail/actions/runs/43759342831) |
| [ledger-lint](https://ledger-lint.vercel.app/) | 14 | [`6914a3b291a7134e60c324a0ff009b19b9b488f0`](https://github.com/ufodia/ledger-lint/commit/6914a3b291a7134e60c324a0ff009b19b9b488f0) | [Başarılı](https://github.com/ufodia/ledger-lint/actions/runs/43762439010) |
| [locale-crash](https://locale-crash.vercel.app/) | 3 | [`50509ed84dbea9b50d589d8a528970d148334d92`](https://github.com/ufodia/locale-crash/commit/50509ed84dbea9b50d589d8a528970d148334d92) | [Başarılı](https://github.com/ufodia/locale-crash/actions/runs/43758950023) |
| [memory-mirror](https://memory-mirror-app.vercel.app/) | 13 | [`608192efad03e9287d3c8eade6aad5b8d6ec1a26`](https://github.com/ufodia/memory-mirror/commit/608192efad03e9287d3c8eade6aad5b8d6ec1a26) | [Başarılı](https://github.com/ufodia/memory-mirror/actions/runs/43759342224) |
| [paper-portal](https://paper-portal-three.vercel.app/) | 10 | [`7ee3edf25f8ac821f276c1fef338e0fa595df461`](https://github.com/ufodia/paper-portal/commit/7ee3edf25f8ac821f276c1fef338e0fa595df461) | [Başarılı](https://github.com/ufodia/paper-portal/actions/runs/43762024545) |
| [paper-surgery](https://paper-surgery.vercel.app/) | 4 | [`f9b73e37b3cac43285d166f0c051bb29c7a9bee2`](https://github.com/ufodia/paper-surgery/commit/f9b73e37b3cac43285d166f0c051bb29c7a9bee2) | [Başarılı](https://github.com/ufodia/paper-surgery/actions/runs/43758947521) |
| [poster-proof](https://poster-proof.vercel.app/) | 5 | [`9e101f7941a570790b067fbd3a4e8ce8434ffdbf`](https://github.com/ufodia/poster-proof/commit/9e101f7941a570790b067fbd3a4e8ce8434ffdbf) | [Başarılı](https://github.com/ufodia/poster-proof/actions/runs/43758948810) |
| [sheet-sentry](https://sheet-sentry.vercel.app/) | 14 | [`5778d7481d3fd71f77a67805c4d93dfae0a8aefd`](https://github.com/ufodia/sheet-sentry/commit/5778d7481d3fd71f77a67805c4d93dfae0a8aefd) | [Başarılı](https://github.com/ufodia/sheet-sentry/actions/runs/43759340795) |
| [source-domino](https://source-domino.vercel.app/) | 5 | [`74bc4e7632bfe69e1be55ff012aa611895d64eed`](https://github.com/ufodia/source-domino/commit/74bc4e7632bfe69e1be55ff012aa611895d64eed) | [Başarılı](https://github.com/ufodia/source-domino/actions/runs/43758948551) |

## Gerçek tarayıcı yakınlaştırması ve ek onarımlar

İzole **Chromium 158.0.8127.18** profilinde yerel bir test eklentisi ve resmi [`chrome.tabs.setZoom`](https://developer.chrome.com/docs/extensions/reference/api/tabs#method-setZoom) API'si kullanıldı. Tarayıcı yakınlaştırması geri okundu; %100 → %200 → %400 sırasında içerik genişliği **1280 → 640 → 320 CSS px**, yüksekliği **1024 → 512 → 256**, DPR ise **1 → 2 → 4** oldu. `visualViewport.scale` 1, CSS zoom 1 ve transform none olarak kaldı. Bu, viewport boyutu emülasyonu değildir; insanın tarayıcı menüsüne basması olarak da sunulmaz.

Son sayım, 21 canonical uygulama + Selimoglu EN/TR + gerçek yerel Blackout scanner için **24 ayrı yüzey × iki oran = 48 durum**. Nihai kayıtta **48/48 başarılı**; 21 uygulamanın son native kaynak SHA'ları yayın metadata'sıyla eşleşiyor. Örneklenen kritik odaklarda ekran dışında kalma veya tamamen örtülme yok; sayfa taşması ve JavaScript hatası yok. Dikey kaydırma, büyük bulgu düğmeleri ve gerekli iki boyutlu tablolar otomatik hata sayılmadı. Sayfa taşması, görünür odak, gerçek hit-test, ileri/geri Tab ve örneklenen eylemler kontrol edildi. Kaydırma/font yerleşimi beklendi. Yakınlaştırmada Playwright'ın CSS viewport kırpması yanlış görüntü verdiği için son görseller, zoom'u değiştirmeden CDP'de clip verilmeden fiziksel 1280×1024 yakalandı.

Bu aşamada yeni karşı örnekler bulundu ve kaynakta onarıldı:

| Karşı örnek | Düzeltme / yeniden test |
| --- | --- |
| Boss/Cut, Impossible Print, Paper Portal ve Ghost Words: düzenlenen alanın altındaki Tab hedefi doğru odaklanıyor, fakat ekran dışında kalıyordu. | Tab ile yeni hedefe geçerken normal tarayıcı odak kaydırması; aynı alanda düzenleme odağı/caret korunuyor. İleri/geri Tab ve doğal sınırdan çıkış kontrolleri korundu. |
| Context Black Box: son kural silinince pin düğmesi; Fact Fuse: son açık bulgu onaylanınca filtre ekran dışında kalıyordu. | Yeni mantıksal hedefe doğal odak kaydırması. Aynı kontrolün yerinde korunması sürdürüldü; kısa görünüm ve son %200/%400 native tekrarları başarılı. |
| Ledger Lint: seçili bulguyu kapatıp tekrar açınca ilişkili fatura alanı kaydırması odaklı bulguyu ekran dışına götürüyordu. | Alan kaydırmasından sonra bulguya doğal odak dönüşü. Aynı bulgu için iki Enter, %200/%400 kısa görünüm ve gerçek %400 yeniden test. |
| Blackout yerel scanner: %200'den %400'e geçildikten sonra görüntü dialogunu Escape ile kapatmak açıcıyı ekran dışında bırakıyordu. | Dialog dönüşünde doğal odak kaydırması. Gerçek loopback demo/capture ile dev ve production suite'leri **6+6** geçti. |
| Impossible Print canvas grubunda ok tuşlarının ekran okuyucunun gezinme modunda yakalanabilmesi | Bu bir gerçek NVDA FAIL ölçümü değil, resmi kılavuz/kaynak incelemesine dayanan uyumluluk riskidir. Aynı kamera metotlarını kullanan altı adlandırılmış yerel döndürme/zoom düğmesi eklendi. Enter/Space gerçek görüntüyü değiştiriyor, Camera view sıfırlıyor; fallback'te düğmeler disabled. |

Memory Mirror'ın ilk geçici görünmezlik gözlemi taze %200, taze %400 ve %200→%400 tekrarında doğrulanmadı; hata veya ek onarım olarak sayılmadı. Düzeltilmiş kaynakların ve yerel scanner'ın son native tekrarları bağımsız olarak kaydedildi; eski, kırpılmış ara görüntüler başarı kanıtı olarak kullanılmadı.

Görsel kanıt: Ghost Words native %400 [onarım öncesi](audits/2026-11-15/accessibility/ghost-native-zoom-before.jpg) / [onarım sonrası](audits/2026-11-15/accessibility/ghost-native-zoom-after.jpg); [Ledger Lint uzun bulguda görünür odak](audits/2026-11-15/accessibility/ledger-native-zoom-after.jpg). Ledger bulgusu viewport yüksekliğini aşıyor; tamamının aynı anda göründüğü iddia edilmiyor.

## Gerçek ekran okuyucu — kısmi, tamamlanamadı

**NVDA 2026.3.1 portable**, Windows 11 Home Single Language 10.0.26300 (64-bit), Google Chrome **157.0.8103.51** kullanıldı. Resmi indirmenin NV Access Limited imzası geçerliydi. Kullanıcı onayıyla taşınabilir kopya çalıştırıldı; sistem kurulumu veya otomatik başlangıç yapılmadı. [NVDA'nın Speech Viewer ve No Speech desteği](https://download.nvaccess.org/documentation/en/userGuide.html) ile gerçek ekran okuyucunun ürettiği metin incelendi; sesli telaffuz veya braille testi yapılmadı.

| Gerçek gözlem / kalan kapsam | Sonuç |
| --- | --- |
| Selimoglu belge başlığı, production URL ve Skip to content bağlantısı | Gerçek NVDA çıktısında gözlendi. |
| NVDA+F7 Elements List | 18 public bağlantı adlarıyla listelendi. |
| Logo adı `SelimogluIDEA FOUNDRY` biçiminde bitişik geliyordu. | Kaynakta gerçek sözcük aralığı eklendi; EN/TR yerel testleri geçti. Canlı yayın ve aynı NVDA kontrolü bekliyor. Bu, sesli telaffuz testi değildir. |
| Uygulama formları, sekmeler, radyo grupları, canlı duyurular ve dialog akışlarının gerçek NVDA ile tamamlanması | **NOT TESTED / tamamlanamadı.** DOM semantiği veya kararlı status düğümü, gerçek duyuru başarısı sayılmadı. |

Masaüstü girdisi `failed to activate captured window`, tarayıcı denetimi `Computer Use helper already has an active request` hatalarıyla durdu. Yalnız bu testin NVDA süreci resmi `--quit` komutuyla normal kapatıldı ve kapandığı geri okundu; bağlantı hatası sürdü. Önceki Escape handoff'u artık gerekli değil. Ham Speech Viewer geçmişi veya kullanıcının diğer pencerelerinden konuşma içeriği bu rapora eklenmedi. **AT uyumluluğu: PARTIAL; uygulama görevi tamamlanması NOT DETERMINED.** Masaüstü bağlantısı yeniden sağlanınca bu gerçek akışların ve yeni bulguların aynı yöntemle tekrar testi gerekiyor.

## selimoglu.org — GitHub kaynağı hazır, hosting yüklemesi tamamlanamadı

Yeni kaynak GitHub `main` içindeki [`59c8cd20116af805d575e8868d15773a549bd4f8`](https://github.com/ufodia/ufodia/commit/59c8cd20116af805d575e8868d15773a549bd4f8) sürümüdür. 400px ve altında dikey proje sekmeleri, görsel düzene uyan yön tuşları, hash değişimi sırasında arama odağını bozan yarış durumu ve zorlanmış renklerde seçili metin/zemin eşleşmesi düzeltildi. Logo adına gerçek sözcük aralığı eklendi; yeni HTML sürümlü `site-v4.js` dosyasını kullanıyor.

Temiz **59c8cd…** kaynağı EN/TR × 320/390/640/1280px için sekiz görünümde tekrar test edildi ve dosya hash'leri kaydedildi: kesin axe ihlali yok; 640px'teki yatay rayın görünüm dışı sekmeleri için her dilde 27 kontrast `incomplete` kaydı var. Bunlar görünür metin otomatik başarılı sayılarak kapatılmadı. Önceki **725b12…** kaynağındaki 12 sınır görünümü EN/TR × 320/400/401/720/721/1280'de sekme yönü, Home/End, son sekmenin rayda görünmesi, arama sıfırlama ve skip-link sonraki Tab hedefini doğrulamıştı. Bu iki kaynak kaydı ayrıdır.

Canlı EN/TR hâlâ **`site-v3.js`** kullanıyor; HTML/script normalize hash'leri eski `941e001365c1b81549b3740e652c9fe6270d5694` yayınıyla eşleşti. **Yeni 59c8cd… kaynak hosting'e yüklenmedi.** Masaüstü/tarayıcı kontrol bağlantısı erişilemediği için cPanel yüklemesi tamamlanamadı. Canlı portföydeki native zoom sonucu bu eski yayına aittir; yeni kaynağın yayın kanıtı olarak kullanılmadı.

Hazırlanan dar yükleme planı: önce `assets/site-v4.js`, ardından `tr/index.html` ve `index.html`. Önbellekteki eski HTML için sunucudaki `site-v3.js`; mevcut `.htaccess`, ownership dosyaları, `nope/` ve ilgisiz dosyalar korunmalı. Üç dosyalık ZIP ve SHA256 manifesti yerel çalışma kanıtlarında hazır; kaynak ve yeniden paketleme komutları GitHub main'de. Bağlantı sağlanınca dosyalar yüklenmeli, iki canlı HTML ve JS hash'leri geri okunmalı; EN/TR canlı testleri ve gerçek NVDA logo adı kontrolü tekrar edilmeli.

## Yayın sonrası Search Console — tamamlanamadı

Son HTTP okumasında 21 uygulama ve Selimoglu ana sayfası için **22/22 HTTP 200, self-canonical ve erişilebilir sitemap** doğrulandı; robots dosyaları da erişilebilir. Bu, Google Search Console property erişimi, sitemap işlem durumu, URL Inspection veya indexing isteği değildir. **Bu takip turu için authenticated Search Console durumu: NOT CHECKED.** Aynı masaüstü/tarayıcı bağlantısı engeli nedeniyle yeni yayınlar sonrası kontroller yapılamadı.

Önceki [QA raporundaki Search Console sonuçları](QA-REMEDIATION-2026-11-15.md#google-search-console) tarihli geçmiş gözlemlerdir. Bağlantı sağlanınca mevcut canonical property'lerde güncel sitemap işleme durumu ve değişen public URL'ler incelenmeli; Selimoglu için bu işlem yeni hosting yüklemesinden sonra yapılmalı. [Google sitemap](https://support.google.com/webmasters/answer/7451001) ve [URL Inspection](https://support.google.com/webmasters/answer/9012289) rehberleri doğrultusunda yalnız production/indexlenmesi amaçlanan URL'ler kullanılmalı. Bu tur yeni indexing isteği veya sitemap yeniden gönderimi yapılmadı.

## Kalan sınırlar ve takip

- Test edilen kaynak/dağıtım sonuçları yukarıdaki SHA'lara aittir. Sonraki commitler veya tarayıcı sürümleri için aynı iddia otomatik taşınmaz.
- Gerçek NVDA görev akışlarını tamamlamak; yeni bulgu çıkarsa düzeltmek ve aynı ortamda tekrar doğrulamak gerekir. JAWS, VoiceOver, mobil ekran okuyucular ve sesle kontrol bu rapordaki betikli testlerden çıkarımla başarılı sayılmaz.
- Gerçek kamera/kart takibi, gamepad, fiziksel yazıcı ve her dışa aktarılmış belgenin yardımcı teknolojiyle kullanımı bütünüyle doğrulanmadı. Canvas/SVG için eklenen sayısal/tablosal alternatifler örneklendi.
- Kullanıcı verisi yerine sentetik fikstürler kullanıldı. Blackout yerel kontrolleri harici sitelerde tarama yapmadı.
- Önceden var olan, değiştirilmemiş bazı biçim denetimi uyarıları tam format komutunda kalıyor; onarılan dosyalar biçimlendirildi. Başarılı test/build/CI sonuçları bu uyarılarla karıştırılmadı.
- Bu rapor mevcut karşı örnekleri ve onarımları belgeler; bütün sayfalarda bütün WCAG 2.2 A/AA ölçütlerinin eksiksiz değerlendirildiğine dair bir uygunluk sertifikası değildir.
