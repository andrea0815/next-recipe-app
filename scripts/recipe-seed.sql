begin;

-- =========================================================
-- REALISTIC SEED DATA FOR ONE USER
-- Replace ONLY this value everywhere: 'c69a8909-8a14-4a38-9c30-1569defee9da'
-- =========================================================

-- -------------------------
-- Categories
-- -------------------------
insert into categories (name, owner_id)
values
  ('Suppe', null),
  ('Salat', null),
  ('Pfanne', null),
  ('Ofen', null),
  ('Auflauf', null),
  ('Eintopf', null),
  ('Vegetarisch', null),
  ('Vegan', null),
  ('Asiatisch', null),
  ('Italienisch', null),
  ('Vietnamesisch', null),
  ('Österreichisch', null),
  ('Mexikanisch', null),
  ('Gebäck', null)
  ('Dessert', null),
  ('Kuchen', null)
  ('Kekse', null)
  ('Getränke', null)
  ('Soße', null)
  ('Warm', null),
  ('Kalt', null),
on conflict do nothing;

-- -------------------------
-- Units
-- -------------------------
insert into units (name, abbreviation, plural, owner_id)
values
  ('Gramm', 'g', null, null),
  ('Milligramm', 'mg', null, null),
  ('Kilogramm', 'kg', null, null),
  ('Milliliter', 'ml', null, null),
  ('Deziliter', 'dl', null, null),
  ('Centiliter', 'cl', null, null),
  ('Liter', 'l', null, null),
  ('Stück', 'Stk', null, null),
  ('Packung', 'Pck', 'Packungen', null),
  ('Beutel', 'Btl', null, null),
  ('Dose', null, 'Dosen', null),
  ('Kanne', null, 'Kannen', null),
  ('Esslöffel', 'EL', null, null),
  ('Teelöffel', 'TL', null, null),
  ('Zehe', null, 'Zehen', null),
  ('Prise', null, 'Prisen', null),
  ('Tasse', null, 'Tassen', null)
  ('Bund', null, 'Bünde', null)
  ('Knolle', null, 'Knollen', null)
  ('Ounce', 'oz', 'ounces', null)
  ('Messerspitze', "Msp", null, null)
on conflict do nothing;

-- -------------------------
-- Ingredients
-- -------------------------
insert into ingredients (name, plural, owner_id)
values
  ('Ei', 'Eier', null),
  ('Mehl', null, null),
  ('Kürbis entkernt', null, null),
  ('Zucker', null, null),
  ('Salz', null, null),
  ('Pfeffer', null, null),
  ('Muskatnuss', null, null),
  ('Butter', null, null),
  ('Milch', null, null),
  ('Sahne', null, null),
  ('Quark', null, null),
  ('Joghurt', null, null),
  ('Frischkäse', null, null),
  ('Käse', null, null),
  ('Parmesan', null, null),
  ('Mozzarella', null, null),
  ('Feta', null, null),
  ('Hähnchenbrust', null, null),
  ('Rinderhack', null, null),
  ('Schweinefleisch', null, null),
  ('Speck', null, null),
  ('Schinken', null, null),
  ('Lachs', null, null),
  ('Thunfisch', null, null),
  ('Kartoffel', 'Kartoffeln', null),
  ('Süßkartoffel', 'Süßkartoffeln', null),
  ('Reis', null, null),
  ('Nudel', 'Nudeln', null),
  ('Spaghetti', null, null),
  ('Penne', null, null),
  ('Sauerrahm', null, null),
  ('Brot', 'Brote', null),
  ('Toastbrot', null, null),
  ('Semmelbrösel', null, null),
  ('Haferflocken', null, null),
  ('Tomate', 'Tomaten', null),
  ('Cherrytomate', 'Cherrytomaten', null),
  ('Gurke', 'Gurken', null),
  ('Paprika', null, null),
  ('Zucchini', null, null),
  ('Bergkäse', null, null),
  ('Aubergine', 'Auberginen', null),
  ('Karotte', 'Karotten', null),
  ('Möhre', 'Möhren', null),
  ('Zwiebel', 'Zwiebeln', null),
  ('Knoblauch', null, null),
  ('Knoblauchzehe', 'Knoblauchzehen', null),
  ('Lauch', null, null),
  ('Frühlingszwiebel', 'Frühlingszwiebeln', null),
  ('Brokkoli', null, null),
  ('Blumenkohl', null, null),
  ('Spinat', null, null),
  ('Rucola', null, null),
  ('Eisbergsalat', null, null),
  ('Avocado', 'Avocados', null),
  ('Champignon', 'Champignons', null),
  ('Erbse', 'Erbsen', null),
  ('Mais', null, null),
  ('Bohne', 'Bohnen', null),
  ('Kichererbse', 'Kichererbsen', null),
  ('Linse', 'Linsen', null),
  ('Zitrone', 'Zitronen', null),
  ('Limette', 'Limetten', null),
  ('Apfel', 'Äpfel', null),
  ('Banane', 'Bananen', null),
  ('Erdbeere', 'Erdbeeren', null),
  ('Blaubeere', 'Blaubeeren', null),
  ('Himbeere', 'Himbeeren', null),
  ('Orange', 'Orangen', null),
  ('Honig', null, null),
  ('Ahornsirup', null, null),
  ('Marmelade', null, null),
  ('Nutella', null, null),
  ('Olivenöl', null, null),
  ('Sonnenblumenöl', null, null),
  ('Essig', null, null),
  ('Balsamico', null, null),
  ('Senf', null, null),
  ('Süsser Senf', null, null),
  ('Mayonnaise', null, null),
  ('Ketchup', null, null),
  ('Tomatenmark', null, null),
  ('Passierte Tomaten', null, null),
  ('Gehackte Tomaten', null, null),
  ('Tomate', 'Tomaten', null),
  ('Gemüsebrühe', null, null),
  ('Hühnerbrühe', null, null),
  ('Sojasauce', null, null),
  ('Worcestersauce', null, null),
  ('Haselnuss', 'Haselnüsse', null),
  ('Backpulver', null, null),
  ('Puderzucker', null, null),
  ('Natron', null, null),
  ('Vanillezucker', null, null),
  ('Trockenhefe', null, null),
  ('Hefe', null, null),
  ('Sellerie', null, null),
  ('Rotwein', null, null),
  ('Schlagobers', null, null),
  ('Gelierzucker', null, null),
  ('Erbse', 'Erbsen', null),
  ('Lauch', null, null),
  ('Margarine', null, null),
  ('Basilikum', null, null),
  ('Ahornsirup', null, null),
  ('Faschiertes', null, null),
  ('Kakao', null, null),
  ('Zartbitterschokolade', null, null),
  ('Milchschokolade', null, null),
  ('Weiße Schokolade', null, null),
  ('Weißwein', null, null),
  ('Suppenwürfel', null, null),
  ('Gemüsesuppe', null, null),
  ('Mandeln', null, null),
  ('Walnuss', 'Walnüsse', null),
  ('Haselnüsse', null, null),
  ('Cashewkerne', null, null),
  ('Erdnüsse', null, null),
  ('Gnocchi', null, null),
  ('braune Linse', 'braune Linsen', null),
  ('rote Linse', 'rote Linsen', null),
  ('Rosinen', null, null),
  ('Zimt', null, null),
  ('Lorbeerblatt', 'Lorbeerblätter', null),
  ('Paprikapulver', null, null),
  ('Currypulver', null, null),
  ('Kreuzkümmel', null, null),
  ('Kümmel', null, null),
  ('Oregano', null, null),
  ('Basilikum', null, null),
  ('Thymian', null, null),
  ('Rosmarin', null, null),
  ('Petersilie', null, null),
  ('Schnittlauch', null, null),
  ('Dill', null, null),
  ('Kräuter', null, null)
on conflict do nothing;

begin;

-- =========================================================
-- RECIPES THAT FIT THE SEEDED GERMAN TABLES
-- Owner ID used everywhere:
-- c69a8909-8a14-4a38-9c30-1569defee9da
-- =========================================================

-- -------------------------
-- Recipes
-- -------------------------
insert into recipes (
  name,
  subtitle,
  owner_id,
  is_public,
  image_uri,
  slug,
  groups_enabled,
  portions
)
values
  (
    'Klassische Palatschinken',
    'Schnelle süße Palatschinken für Frühstück oder Dessert',
    'c69a8909-8a14-4a38-9c30-1569defee9da',
    false,
    'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
    'klassische-palatschinken',
    false,
    2
  ),
  (
    'Cremige Knoblauch Pasta',
    'Einfache Pasta mit Knoblauch, Sahne und Parmesan',
    'c69a8909-8a14-4a38-9c30-1569defee9da',
    false,
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
    'cremige-knoblauch-pasta',
    false,
    2
  ),
  (
    'Hühner Reis Bowl',
    'Reis mit gebratener Hühnerbrust und Gemüse',
    'c69a8909-8a14-4a38-9c30-1569defee9da',
    false,
    'https://images.unsplash.com/photo-1547592180-85f173990554',
    'huehner-reis-bowl',
    true,
    2
  ),
  (
    'Gemüsepfanne mit Sojasauce',
    'Bunte schnelle Gemüsepfanne mit würziger Sauce',
    'c69a8909-8a14-4a38-9c30-1569defee9da',
    false,
    'https://images.unsplash.com/photo-1512058564366-18510be2db19',
    'gemuesepfanne-mit-sojasauce',
    true,
    2
  ),
  (
    'Pasta Auflauf mit Tomate und Mozzarella',
    'Herzhafter Auflauf mit Tomaten, Pasta und Käse',
    'c69a8909-8a14-4a38-9c30-1569defee9da',
    false,
    'https://images.unsplash.com/photo-1622973536968-3ead9e780960',
    'pasta-auflauf-tomate-mozzarella',
    true,
    4
  ),
  (
    'Schoko Bananen Overnight Oats',
    'Einfaches Frühstück zum Vorbereiten mit Banane und Kakao',
    'c69a8909-8a14-4a38-9c30-1569defee9da',
    false,
    'https://images.unsplash.com/photo-1517673400267-0251440c45dc',
    'schoko-bananen-overnight-oats',
    false,
    1
  )
on conflict do nothing;

-- -------------------------
-- Recipe <-> Categories
-- -------------------------
insert into recipe_categories (recipe_id, category_id)
select r.id, c.id
from recipes r
join categories c
  on c.owner_id = r.owner_id
where r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
and (
  (r.slug = 'klassische-palatschinken' and c.name in ('Dessert', 'Kuchen', 'Kalt'))
  or
  (r.slug = 'cremige-knoblauch-pasta' and c.name in ('Italienisch', 'Warm'))
  or
  (r.slug = 'huehner-reis-bowl' and c.name in ('Warm'))
  or
  (r.slug = 'gemuesepfanne-mit-sojasauce' and c.name in ('Pfanne', 'Vegetarisch', 'Asiatisch', 'Warm'))
  or
  (r.slug = 'pasta-auflauf-tomate-mozzarella' and c.name in ('Auflauf', 'Italienisch', 'Vegetarisch', 'Warm'))
  or
  (r.slug = 'schoko-bananen-overnight-oats' and c.name in ('Dessert', 'Kalt'))
)
on conflict do nothing;

-- =========================================================
-- RECIPE INGREDIENTS
-- =========================================================

-- -------------------------
-- Klassische Palatschinken
-- -------------------------
insert into recipe_ingredients (
  recipe_id, ingredient_id, unit_id, amount, owner_id, group_name, position
)
select
  r.id,
  i.id,
  u.id,
  x.amount,
  'c69a8909-8a14-4a38-9c30-1569defee9da',
  null,
  x.position
from recipes r
join (
  values
    ('Mehl', 'Gramm', 180, 1),
    ('Milch', 'Milliliter', 300, 2),
    ('Ei', 'Stück', 2, 3),
    ('Zucker', 'Esslöffel', 2, 4),
    ('Salz', 'Prise', 1, 5),
    ('Butter', 'Gramm', 20, 6)
) as x(ingredient_name, unit_name, amount, position) on true
join ingredients i
  on i.name = x.ingredient_name
 and i.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
join units u
  on u.name = x.unit_name
 and u.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
where r.slug = 'klassische-palatschinken'
  and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
on conflict do nothing;

-- -------------------------
-- Cremige Knoblauch Pasta
-- -------------------------
insert into recipe_ingredients (
  recipe_id, ingredient_id, unit_id, amount, owner_id, group_name, position
)
select
  r.id,
  i.id,
  u.id,
  x.amount,
  'c69a8909-8a14-4a38-9c30-1569defee9da',
  null,
  x.position
from recipes r
join (
  values
    ('Pasta', 'Gramm', 250, 1),
    ('Knoblauch', 'Zehe', 3, 2),
    ('Butter', 'Gramm', 20, 3),
    ('Sahne', 'Milliliter', 200, 4),
    ('Parmesan', 'Gramm', 50, 5),
    ('Salz', 'Teelöffel', 1, 6),
    ('Schwarzer Pfeffer', 'Teelöffel', 1, 7),
    ('Olivenöl', 'Esslöffel', 1, 8)
) as x(ingredient_name, unit_name, amount, position) on true
join ingredients i
  on i.name = x.ingredient_name
 and i.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
join units u
  on u.name = x.unit_name
 and u.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
where r.slug = 'cremige-knoblauch-pasta'
  and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
on conflict do nothing;

-- -------------------------
-- Hühner Reis Bowl
-- -------------------------
insert into recipe_ingredients (
  recipe_id, ingredient_id, unit_id, amount, owner_id, group_name, position
)
select
  r.id,
  i.id,
  u.id,
  x.amount,
  'c69a8909-8a14-4a38-9c30-1569defee9da',
  x.group_name,
  x.position
from recipes r
join (
  values
    ('Reis', 'Gramm', 150, 'Basis', 1),
    ('Gemüsebrühe', 'Milliliter', 300, 'Basis', 2),
    ('Hühnerbrust', 'Gramm', 300, 'Protein', 3),
    ('Olivenöl', 'Esslöffel', 1, 'Protein', 4),
    ('Paprika', 'Teelöffel', 1, 'Protein', 5),
    ('Salz', 'Teelöffel', 1, 'Protein', 6),
    ('Schwarzer Pfeffer', 'Teelöffel', 1, 'Protein', 7),
    ('Brokkoli', 'Gramm', 150, 'Gemüse', 8),
    ('Karotte', 'Stück', 1, 'Gemüse', 9),
    ('Paprikaschote', 'Stück', 1, 'Gemüse', 10)
) as x(ingredient_name, unit_name, amount, group_name, position) on true
join ingredients i
  on i.name = x.ingredient_name
 and i.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
join units u
  on u.name = x.unit_name
 and u.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
where r.slug = 'huehner-reis-bowl'
  and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
on conflict do nothing;

-- -------------------------
-- Gemüsepfanne mit Sojasauce
-- -------------------------
insert into recipe_ingredients (
  recipe_id, ingredient_id, unit_id, amount, owner_id, group_name, position
)
select
  r.id,
  i.id,
  u.id,
  x.amount,
  'c69a8909-8a14-4a38-9c30-1569defee9da',
  x.group_name,
  x.position
from recipes r
join (
  values
    ('Brokkoli', 'Gramm', 150, 'Gemüse', 1),
    ('Karotte', 'Stück', 1, 'Gemüse', 2),
    ('Paprikaschote', 'Stück', 1, 'Gemüse', 3),
    ('Zucchini', 'Stück', 1, 'Gemüse', 4),
    ('Zwiebel', 'Stück', 1, 'Gemüse', 5),
    ('Knoblauch', 'Zehe', 2, 'Soße', 6),
    ('Sojasauce', 'Esslöffel', 3, 'Soße', 7),
    ('Honig', 'Esslöffel', 1, 'Soße', 8),
    ('Olivenöl', 'Esslöffel', 1, 'Soße', 9),
    ('Schwarzer Pfeffer', 'Teelöffel', 1, 'Soße', 10)
) as x(ingredient_name, unit_name, amount, group_name, position) on true
join ingredients i
  on i.name = x.ingredient_name
 and i.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
join units u
  on u.name = x.unit_name
 and u.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
where r.slug = 'gemuesepfanne-mit-sojasauce'
  and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
on conflict do nothing;

-- -------------------------
-- Pasta Auflauf mit Tomate und Mozzarella
-- -------------------------
insert into recipe_ingredients (
  recipe_id, ingredient_id, unit_id, amount, owner_id, group_name, position
)
select
  r.id,
  i.id,
  u.id,
  x.amount,
  'c69a8909-8a14-4a38-9c30-1569defee9da',
  x.group_name,
  x.position
from recipes r
join (
  values
    ('Pasta', 'Gramm', 300, 'Pasta', 1),
    ('Tomate', 'Stück', 4, 'Soße', 2),
    ('Knoblauch', 'Zehe', 2, 'Soße', 3),
    ('Olivenöl', 'Esslöffel', 1, 'Soße', 4),
    ('Salz', 'Teelöffel', 1, 'Soße', 5),
    ('Schwarzer Pfeffer', 'Teelöffel', 1, 'Soße', 6),
    ('Mozzarella', 'Gramm', 200, 'Belag', 7),
    ('Parmesan', 'Gramm', 40, 'Belag', 8),
    ('Basilikum', 'Esslöffel', 2, 'Belag', 9)
) as x(ingredient_name, unit_name, amount, group_name, position) on true
join ingredients i
  on i.name = x.ingredient_name
 and i.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
join units u
  on u.name = x.unit_name
 and u.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
where r.slug = 'pasta-auflauf-tomate-mozzarella'
  and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
on conflict do nothing;

-- -------------------------
-- Schoko Bananen Overnight Oats
-- -------------------------
insert into recipe_ingredients (
  recipe_id, ingredient_id, unit_id, amount, owner_id, group_name, position
)
select
  r.id,
  i.id,
  u.id,
  x.amount,
  'c69a8909-8a14-4a38-9c30-1569defee9da',
  null,
  x.position
from recipes r
join (
  values
    ('Haferflocken', 'Gramm', 60, 1),
    ('Milch', 'Milliliter', 150, 2),
    ('Griechischer Joghurt', 'Gramm', 80, 3),
    ('Banane', 'Stück', 1, 4),
    ('Kakaopulver', 'Esslöffel', 1, 5),
    ('Honig', 'Esslöffel', 1, 6)
) as x(ingredient_name, unit_name, amount, position) on true
join ingredients i
  on i.name = x.ingredient_name
 and i.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
join units u
  on u.name = x.unit_name
 and u.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
where r.slug = 'schoko-bananen-overnight-oats'
  and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
on conflict do nothing;

-- =========================================================
-- RECIPE STEPS
-- =========================================================

-- Klassische Palatschinken
insert into recipe_steps (recipe_id, step_index, text, hint)
select r.id, s.step_index, s.text, s.hint
from recipes r
join (
  values
    (1, 'Mehl, Zucker und Salz in einer Schüssel vermischen.', 'Die trockenen Zutaten zuerst verrühren.'),
    (2, 'Milch und Eier in einer zweiten Schüssel verquirlen.', 'So entstehen später weniger Klümpchen.'),
    (3, 'Die flüssigen Zutaten zu den trockenen geben und kurz verrühren.', 'Nicht zu lange rühren.'),
    (4, 'Butter in einer Pfanne bei mittlerer Hitze erhitzen.', 'Die Pfanne sollte gleichmäßig heiß sein.'),
    (5, 'Teig portionsweise eingießen und backen, bis die Unterseite goldbraun ist.', 'Dann vorsichtig wenden.'),
    (6, 'Die zweite Seite fertig backen und warm servieren.', 'Mit Zucker, Marmelade oder Obst servieren.')
) as s(step_index, text, hint) on true
where r.slug = 'klassische-palatschinken'
  and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
on conflict do nothing;

-- Cremige Knoblauch Pasta
insert into recipe_steps (recipe_id, step_index, text, hint)
select r.id, s.step_index, s.text, s.hint
from recipes r
join (
  values
    (1, 'Die Pasta in reichlich Salzwasser al dente kochen.', 'Etwas Kochwasser aufheben.'),
    (2, 'Butter und Olivenöl in einer großen Pfanne erhitzen.', 'Mittlere Hitze reicht aus.'),
    (3, 'Knoblauch fein hacken und kurz anschwitzen.', 'Er soll nicht braun werden.'),
    (4, 'Sahne zugießen und kurz köcheln lassen.', 'Nur sanft köcheln, nicht stark kochen.'),
    (5, 'Parmesan, Salz und schwarzen Pfeffer einrühren.', 'Gut verrühren, bis die Soße cremig ist.'),
    (6, 'Pasta in die Soße geben und gut vermengen.', 'Bei Bedarf mit Kochwasser verdünnen.')
) as s(step_index, text, hint) on true
where r.slug = 'cremige-knoblauch-pasta'
  and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
on conflict do nothing;

-- Hühner Reis Bowl
insert into recipe_steps (recipe_id, step_index, text, hint)
select r.id, s.step_index, s.text, s.hint
from recipes r
join (
  values
    (1, 'Reis in Gemüsebrühe garen, bis er weich ist.', 'Das gibt mehr Geschmack als Wasser.'),
    (2, 'Hühnerbrust mit Paprika, Salz und schwarzem Pfeffer würzen.', 'Die Gewürze gut einreiben.'),
    (3, 'Hühnerbrust in Olivenöl goldbraun braten und durchgaren.', 'Danach kurz ruhen lassen.'),
    (4, 'Brokkoli, Karotte und Paprikaschote garen oder anbraten.', 'Das Gemüse sollte noch etwas Biss haben.'),
    (5, 'Reis, Hühnerbrust und Gemüse in Schüsseln anrichten.', 'Am besten sofort servieren.')
) as s(step_index, text, hint) on true
where r.slug = 'huehner-reis-bowl'
  and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
on conflict do nothing;

-- Gemüsepfanne mit Sojasauce
insert into recipe_steps (recipe_id, step_index, text, hint)
select r.id, s.step_index, s.text, s.hint
from recipes r
join (
  values
    (1, 'Gemüse in mundgerechte Stücke schneiden.', 'Möglichst gleich groß schneiden.'),
    (2, 'Sojasauce, Honig und schwarzen Pfeffer verrühren.', 'Das ist die Soße für die Pfanne.'),
    (3, 'Olivenöl in einer großen Pfanne erhitzen.', 'Die Pfanne sollte gut heiß sein.'),
    (4, 'Zwiebel und Knoblauch kurz anbraten, dann das übrige Gemüse dazugeben.', 'Nicht zu voll beladen.'),
    (5, 'Alles unter Rühren braten, bis das Gemüse bissfest ist.', 'Leichte Röstaromen sind ideal.'),
    (6, 'Die Soße dazugeben und 1 bis 2 Minuten schwenken.', 'Heiß servieren.')
) as s(step_index, text, hint) on true
where r.slug = 'gemuesepfanne-mit-sojasauce'
  and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
on conflict do nothing;

-- Pasta Auflauf mit Tomate und Mozzarella
insert into recipe_steps (recipe_id, step_index, text, hint)
select r.id, s.step_index, s.text, s.hint
from recipes r
join (
  values
    (1, 'Die Pasta knapp bissfest kochen und abgießen.', 'Im Ofen gart sie noch nach.'),
    (2, 'Knoblauch in Olivenöl anbraten und die Tomaten hinzufügen.', 'Die Tomaten weich kochen lassen.'),
    (3, 'Mit Salz und schwarzem Pfeffer abschmecken.', 'Vor dem Backen kosten.'),
    (4, 'Pasta mit der Tomatensoße vermischen und in eine Auflaufform geben.', 'Gleichmäßig verteilen.'),
    (5, 'Mozzarella, Parmesan und Basilikum darübergeben.', 'Die Oberfläche gut bedecken.'),
    (6, 'Bei 200 Grad backen, bis der Käse geschmolzen und goldbraun ist.', 'Etwa 20 Minuten sind ideal.')
) as s(step_index, text, hint) on true
where r.slug = 'pasta-auflauf-tomate-mozzarella'
  and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
on conflict do nothing;

-- Schoko Bananen Overnight Oats
insert into recipe_steps (recipe_id, step_index, text, hint)
select r.id, s.step_index, s.text, s.hint
from recipes r
join (
  values
    (1, 'Die halbe Banane in einem Glas oder einer Schüssel zerdrücken.', 'So wird es natürlich süßer.'),
    (2, 'Haferflocken, Milch, Joghurt, Kakaopulver und Honig dazugeben.', 'Alles gut verrühren.'),
    (3, 'Abdecken und über Nacht kalt stellen.', 'Mindestens 6 Stunden kühlen.'),
    (4, 'Vor dem Servieren mit der restlichen Banane garnieren.', 'Schmeckt direkt aus dem Kühlschrank.')
) as s(step_index, text, hint) on true
where r.slug = 'schoko-bananen-overnight-oats'
  and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
on conflict do nothing;

commit;