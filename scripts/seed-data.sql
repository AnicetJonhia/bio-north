-- Insertion des données de démonstration

-- Catégories
INSERT INTO categories (name, name_en, description, description_en, icon) VALUES
('Épices & Aromates', 'Spices & Aromatics', 'Vanille, poivre, cannelle et autres épices authentiques de Madagascar', 'Vanilla, pepper, cinnamon and other authentic spices from Madagascar', 'leaf'),
('Huiles Essentielles', 'Essential Oils', 'Huiles pures distillées artisanalement', 'Pure oils distilled artisanally', 'droplet'),
('Plantes Médicinales', 'Medicinal Plants', 'Tisanes et plantes traditionnelles malgaches', 'Traditional Malagasy herbal teas and plants', 'flower'),
('Produits Transformés', 'Processed Products', 'Miels, confitures et produits artisanaux', 'Honey, jams and artisanal products', 'package');

-- Produits
INSERT INTO products (name, name_en, description, description_en, category, category_en, price, stock, available, certifications, rating) VALUES
('Vanille Bourbon Premium', 'Premium Bourbon Vanilla', 'Gousses de vanille Bourbon de Madagascar, qualité premium, cultivées à Andapa dans le respect des traditions ancestrales.', 'Premium Bourbon vanilla pods from Madagascar, cultivated in Andapa with respect for ancestral traditions.', 'Épices & Aromates', 'Spices & Aromatics', 45.00, 150, true, '{"Bio", "Commerce Équitable"}', 5),
('Poivre Sauvage SAVA', 'SAVA Wild Pepper', 'Poivre sauvage récolté dans les forêts primaires de la région SAVA, arôme intense et unique, récolte durable.', 'Wild pepper harvested from primary forests of SAVA region, intense and unique aroma, sustainable harvest.', 'Épices & Aromates', 'Spices & Aromatics', 28.00, 75, true, '{"Bio", "Sauvage"}', 5),
('Huile Essentielle d''Ylang-Ylang', 'Ylang-Ylang Essential Oil', 'Huile essentielle pure d''ylang-ylang, distillée artisanalement à Madagascar selon les méthodes traditionnelles.', 'Pure ylang-ylang essential oil, artisanally distilled in Madagascar using traditional methods.', 'Huiles Essentielles', 'Essential Oils', 35.00, 45, true, '{"Bio", "Artisanal"}', 5),
('Tisane Ravintsara', 'Ravintsara Herbal Tea', 'Feuilles de ravintsara séchées, plante médicinale traditionnelle malgache aux propriétés exceptionnelles.', 'Dried ravintsara leaves, traditional Malagasy medicinal plant with exceptional properties.', 'Plantes Médicinales', 'Medicinal Plants', 18.00, 120, true, '{"Bio", "Traditionnel"}', 4),
('Cannelle de Madagascar', 'Madagascar Cinnamon', 'Écorce de cannelle de Madagascar, saveur douce et parfumée, séchée naturellement au soleil.', 'Madagascar cinnamon bark, sweet and fragrant flavor, naturally sun-dried.', 'Épices & Aromates', 'Spices & Aromatics', 22.00, 0, false, '{"Bio"}', 5),
('Miel de Litchi', 'Lychee Honey', 'Miel artisanal de fleurs de litchi, récolté dans la région SAVA, texture crémeuse et goût délicat.', 'Artisanal lychee flower honey, harvested in SAVA region, creamy texture and delicate taste.', 'Produits Transformés', 'Processed Products', 32.00, 80, true, '{"Bio", "Artisanal"}', 5),
('Huile Essentielle de Niaouli', 'Niaouli Essential Oil', 'Huile essentielle de niaouli, aux propriétés purifiantes, distillée dans le respect de l''environnement.', 'Niaouli essential oil with purifying properties, distilled with respect for the environment.', 'Huiles Essentielles', 'Essential Oils', 25.00, 60, true, '{"Bio", "Durable"}', 4),
('Thé Vert de Madagascar', 'Madagascar Green Tea', 'Thé vert cultivé sur les hauts plateaux malgaches, goût unique et bienfaits exceptionnels.', 'Green tea grown on Malagasy highlands, unique taste and exceptional benefits.', 'Plantes Médicinales', 'Medicinal Plants', 15.00, 200, true, '{"Bio", "Équitable"}', 4);

-- Contenu du site
INSERT INTO site_content (key, value_fr, value_en) VALUES
('hero_title', 'Bio North Madagascar', 'Bio North Madagascar'),
('hero_description', 'Découvrez l''authenticité des produits biologiques malgaches de la région SAVA. Nous valorisons le terroir d''Andapa à travers des produits naturels de qualité exceptionnelle.', 'Discover the authenticity of Malagasy organic products from the SAVA region. We showcase the Andapa terroir through exceptional quality natural products.'),
('company_phone', '+261 XX XX XXX XX', '+261 XX XX XXX XX'),
('company_email', 'contact@bionorthmadagascar.mg', 'contact@bionorthmadagascar.mg'),
('company_address', 'Andapa, Région SAVA, Madagascar', 'Andapa, SAVA Region, Madagascar'),
('about_mission', 'Valoriser les produits biologiques malgaches en garantissant leur qualité et leur authenticité, tout en soutenant les communautés rurales.', 'To promote Malagasy organic products by guaranteeing their quality and authenticity, while supporting rural communities.');
