-- Insertion des catégories
INSERT INTO categories (name, name_en, description, description_en, icon) VALUES
('Épices & Aromates', 'Spices & Aromatics', 'Vanille, poivre, cannelle et autres épices authentiques de Madagascar', 'Vanilla, pepper, cinnamon and other authentic spices from Madagascar', 'leaf'),
('Huiles Essentielles', 'Essential Oils', 'Huiles pures distillées artisanalement', 'Pure oils distilled artisanally', 'droplet'),
('Plantes Médicinales', 'Medicinal Plants', 'Tisanes et plantes traditionnelles malgaches', 'Traditional Malagasy herbal teas and plants', 'flower'),
('Produits Transformés', 'Processed Products', 'Miels, confitures et produits artisanaux', 'Honey, jams and artisanal products', 'package');

-- Insertion des produits (avec category_id)
INSERT INTO products (name, name_en, description, description_en, category_id, category, category_en, price, stock, available, certifications, image_url) 
SELECT 
  'Vanille Bourbon Premium', 
  'Premium Bourbon Vanilla', 
  'Gousses de vanille Bourbon de Madagascar, qualité premium, cultivées à Andapa dans le respect des traditions ancestrales.', 
  'Premium Bourbon vanilla pods from Madagascar, cultivated in Andapa with respect for ancestral traditions.', 
  c.id,
  'Épices & Aromates', 
  'Spices & Aromatics', 
  45.00, 
  150, 
  true, 
  '{"Bio", "Commerce Équitable"}',
  '/placeholder.svg?height=300&width=300'
FROM categories c WHERE c.name = 'Épices & Aromates';

INSERT INTO products (name, name_en, description, description_en, category_id, category, category_en, price, stock, available, certifications, image_url) 
SELECT 
  'Poivre Sauvage SAVA', 
  'SAVA Wild Pepper', 
  'Poivre sauvage récolté dans les forêts primaires de la région SAVA, arôme intense et unique, récolte durable.', 
  'Wild pepper harvested from primary forests of SAVA region, intense and unique aroma, sustainable harvest.', 
  c.id,
  'Épices & Aromates', 
  'Spices & Aromatics', 
  28.00, 
  75, 
  true, 
  '{"Bio", "Sauvage"}',
  '/placeholder.svg?height=300&width=300'
FROM categories c WHERE c.name = 'Épices & Aromates';

INSERT INTO products (name, name_en, description, description_en, category_id, category, category_en, price, stock, available, certifications, image_url) 
SELECT 
  'Huile Essentielle d''Ylang-Ylang', 
  'Ylang-Ylang Essential Oil', 
  'Huile essentielle pure d''ylang-ylang, distillée artisanalement à Madagascar selon les méthodes traditionnelles.', 
  'Pure ylang-ylang essential oil, artisanally distilled in Madagascar using traditional methods.', 
  c.id,
  'Huiles Essentielles', 
  'Essential Oils', 
  35.00, 
  45, 
  true, 
  '{"Bio", "Artisanal"}',
  '/placeholder.svg?height=300&width=300'
FROM categories c WHERE c.name = 'Huiles Essentielles';

INSERT INTO products (name, name_en, description, description_en, category_id, category, category_en, price, stock, available, certifications, image_url) 
SELECT 
  'Tisane Ravintsara', 
  'Ravintsara Herbal Tea', 
  'Feuilles de ravintsara séchées, plante médicinale traditionnelle malgache aux propriétés exceptionnelles.', 
  'Dried ravintsara leaves, traditional Malagasy medicinal plant with exceptional properties.', 
  c.id,
  'Plantes Médicinales', 
  'Medicinal Plants', 
  18.00, 
  120, 
  true, 
  '{"Bio", "Traditionnel"}',
  '/placeholder.svg?height=300&width=300'
FROM categories c WHERE c.name = 'Plantes Médicinales';

INSERT INTO products (name, name_en, description, description_en, category_id, category, category_en, price, stock, available, certifications, image_url) 
SELECT 
  'Miel de Litchi', 
  'Lychee Honey', 
  'Miel artisanal de fleurs de litchi, récolté dans la région SAVA, texture crémeuse et goût délicat.', 
  'Artisanal lychee flower honey, harvested in SAVA region, creamy texture and delicate taste.', 
  c.id,
  'Produits Transformés', 
  'Processed Products', 
  32.00, 
  80, 
  true, 
  '{"Bio", "Artisanal"}',
  '/placeholder.svg?height=300&width=300'
FROM categories c WHERE c.name = 'Produits Transformés';

-- Contenu du site
INSERT INTO site_content (key, value_fr, value_en) VALUES
('hero_title', 'Bio North Madagascar', 'Bio North Madagascar'),
('hero_description', 'Découvrez l''authenticité des produits biologiques malgaches de la région SAVA. Nous valorisons le terroir d''Andapa à travers des produits naturels de qualité exceptionnelle.', 'Discover the authenticity of Malagasy organic products from the SAVA region. We showcase the Andapa terroir through exceptional quality natural products.'),
('company_phone', '+261 XX XX XXX XX', '+261 XX XX XXX XX'),
('company_email', 'contact@bionorthmadagascar.mg', 'contact@bionorthmadagascar.mg'),
('company_address', 'Andapa, Région SAVA, Madagascar', 'Andapa, SAVA Region, Madagascar');



-- Insertion des données par défaut
INSERT INTO contact_info (key, value) VALUES
('company_name', 'Bio North Madagascar SARL'),
('address', 'Andapa, Région SAVA, Madagascar'),
('phone', '+261 34 48 224 12'),
('email', 'contact@bionorthmadagascar.mg'),
('facebook_url', 'https://facebook.com/bionorthmadagascar'),
('linkedin_url', 'https://linkedin.com/company/bionorthmadagascar'),
('business_hours_weekdays', 'Lundi - Vendredi: 8h00 - 17h00'),
('business_hours_saturday', 'Samedi: 8h00 - 12h00'),
('business_hours_sunday', 'Dimanche: Fermé')
ON CONFLICT (key) DO NOTHING;
