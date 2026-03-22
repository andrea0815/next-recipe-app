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
  ('Breakfast', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Lunch', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Dinner', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Dessert', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Vegetarian', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Quick', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Pasta', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Healthy', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Comfort Food', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Baking', 'c69a8909-8a14-4a38-9c30-1569defee9da')
on conflict do nothing;

-- -------------------------
-- Units
-- -------------------------
insert into units (name, abbreviation, plural, owner_id)
values
  ('Gram', 'g', 'Grams', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Kilogram', 'kg', 'Kilograms', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Milliliter', 'ml', 'Milliliters', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Liter', 'l', 'Liters', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Piece', 'pc', 'Pieces', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Tablespoon', 'tbsp', 'Tablespoons', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Teaspoon', 'tsp', 'Teaspoons', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Clove', 'clove', 'Cloves', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Pinch', 'pinch', 'Pinches', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Cup', 'cup', 'Cups', 'c69a8909-8a14-4a38-9c30-1569defee9da')
on conflict do nothing;

-- -------------------------
-- Ingredients
-- -------------------------
insert into ingredients (name, plural, owner_id)
values
  ('Egg', 'Eggs', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Milk', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Flour', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Sugar', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Salt', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Butter', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Olive Oil', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Garlic', 'Garlic cloves', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Onion', 'Onions', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Tomato', 'Tomatoes', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Pasta', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Parmesan', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Rice', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Chicken Breast', 'Chicken Breasts', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Paprika', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Black Pepper', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Carrot', 'Carrots', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Zucchini', 'Zucchinis', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Bell Pepper', 'Bell Peppers', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Broccoli', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Soy Sauce', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Honey', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Lemon', 'Lemons', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Greek Yogurt', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Oats', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Banana', 'Bananas', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Baking Powder', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Cocoa Powder', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Mozzarella', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Basil', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Spinach', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Cream', null, 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Mushroom', 'Mushrooms', 'c69a8909-8a14-4a38-9c30-1569defee9da'),
  ('Vegetable Broth', null, 'c69a8909-8a14-4a38-9c30-1569defee9da')
on conflict do nothing;

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
    'Classic Pancakes',
    'Fluffy breakfast pancakes for lazy weekends',
    'c69a8909-8a14-4a38-9c30-1569defee9da',
    false,
    'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
    'classic-pancakes',
    false,
    2
  ),
  (
    'Creamy Garlic Pasta',
    'Simple weeknight pasta with garlic, cream and parmesan',
    'c69a8909-8a14-4a38-9c30-1569defee9da',
    false,
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
    'creamy-garlic-pasta',
    false,
    2
  ),
  (
    'Chicken Rice Bowl',
    'Balanced bowl with seasoned chicken and vegetables',
    'c69a8909-8a14-4a38-9c30-1569defee9da',
    false,
    'https://images.unsplash.com/photo-1547592180-85f173990554',
    'chicken-rice-bowl',
    true,
    2
  ),
  (
    'Vegetable Stir Fry',
    'Quick colorful vegetables with a sweet-savory sauce',
    'c69a8909-8a14-4a38-9c30-1569defee9da',
    false,
    'https://images.unsplash.com/photo-1512058564366-18510be2db19',
    'vegetable-stir-fry',
    true,
    2
  ),
  (
    'Tomato Mozzarella Pasta Bake',
    'Comforting baked pasta with tomato and melted cheese',
    'c69a8909-8a14-4a38-9c30-1569defee9da',
    false,
    'https://images.unsplash.com/photo-1622973536968-3ead9e780960',
    'tomato-mozzarella-pasta-bake',
    true,
    4
  ),
  (
    'Chocolate Banana Overnight Oats',
    'Easy make-ahead breakfast with cocoa and banana',
    'c69a8909-8a14-4a38-9c30-1569defee9da',
    false,
    'https://images.unsplash.com/photo-1517673400267-0251440c45dc',
    'chocolate-banana-overnight-oats',
    false,
    1
  );

-- -------------------------
-- Recipe <-> Categories
-- -------------------------
insert into recipe_categories (recipe_id, category_id)
select r.id, c.id
from recipes r
join categories c on c.owner_id = r.owner_id
where r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
and (
  (r.slug = 'classic-pancakes' and c.name in ('Breakfast', 'Quick'))
  or
  (r.slug = 'creamy-garlic-pasta' and c.name in ('Dinner', 'Pasta', 'Comfort Food'))
  or
  (r.slug = 'chicken-rice-bowl' and c.name in ('Lunch', 'Dinner', 'Healthy'))
  or
  (r.slug = 'vegetable-stir-fry' and c.name in ('Lunch', 'Dinner', 'Vegetarian', 'Healthy', 'Quick'))
  or
  (r.slug = 'tomato-mozzarella-pasta-bake' and c.name in ('Dinner', 'Pasta', 'Comfort Food'))
  or
  (r.slug = 'chocolate-banana-overnight-oats' and c.name in ('Breakfast', 'Healthy', 'Quick'))
);

-- =========================================================
-- RECIPE INGREDIENTS
-- =========================================================

-- -------------------------
-- Classic Pancakes
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
    ('Flour', 'Gram', 180, 1),
    ('Milk', 'Milliliter', 250, 2),
    ('Egg', 'Piece', 2, 3),
    ('Sugar', 'Tablespoon', 2, 4),
    ('Baking Powder', 'Teaspoon', 2, 5),
    ('Salt', 'Pinch', 1, 6),
    ('Butter', 'Gram', 20, 7)
) as x(ingredient_name, unit_name, amount, position) on true
join ingredients i on i.name = x.ingredient_name and i.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
join units u on u.name = x.unit_name and u.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
where r.slug = 'classic-pancakes' and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da';

-- -------------------------
-- Creamy Garlic Pasta
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
    ('Pasta', 'Gram', 250, 1),
    ('Garlic', 'Clove', 3, 2),
    ('Butter', 'Gram', 20, 3),
    ('Cream', 'Milliliter', 200, 4),
    ('Parmesan', 'Gram', 50, 5),
    ('Salt', 'Teaspoon', 1, 6),
    ('Black Pepper', 'Teaspoon', 1, 7),
    ('Olive Oil', 'Tablespoon', 1, 8)
) as x(ingredient_name, unit_name, amount, position) on true
join ingredients i on i.name = x.ingredient_name and i.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
join units u on u.name = x.unit_name and u.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
where r.slug = 'creamy-garlic-pasta' and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da';

-- -------------------------
-- Chicken Rice Bowl
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
    ('Rice', 'Gram', 150, 'Base', 1),
    ('Vegetable Broth', 'Milliliter', 300, 'Base', 2),
    ('Chicken Breast', 'Gram', 300, 'Protein', 3),
    ('Olive Oil', 'Tablespoon', 1, 'Protein', 4),
    ('Paprika', 'Teaspoon', 1, 'Protein', 5),
    ('Salt', 'Teaspoon', 1, 'Protein', 6),
    ('Black Pepper', 'Teaspoon', 1, 'Protein', 7),
    ('Broccoli', 'Gram', 150, 'Veggies', 8),
    ('Carrot', 'Piece', 1, 'Veggies', 9),
    ('Bell Pepper', 'Piece', 1, 'Veggies', 10)
) as x(ingredient_name, unit_name, amount, group_name, position) on true
join ingredients i on i.name = x.ingredient_name and i.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
join units u on u.name = x.unit_name and u.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
where r.slug = 'chicken-rice-bowl' and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da';

-- -------------------------
-- Vegetable Stir Fry
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
    ('Broccoli', 'Gram', 150, 'Vegetables', 1),
    ('Carrot', 'Piece', 1, 'Vegetables', 2),
    ('Bell Pepper', 'Piece', 1, 'Vegetables', 3),
    ('Zucchini', 'Piece', 1, 'Vegetables', 4),
    ('Onion', 'Piece', 1, 'Vegetables', 5),
    ('Garlic', 'Clove', 2, 'Sauce', 6),
    ('Soy Sauce', 'Tablespoon', 3, 'Sauce', 7),
    ('Honey', 'Tablespoon', 1, 'Sauce', 8),
    ('Olive Oil', 'Tablespoon', 1, 'Sauce', 9),
    ('Black Pepper', 'Teaspoon', 1, 'Sauce', 10)
) as x(ingredient_name, unit_name, amount, group_name, position) on true
join ingredients i on i.name = x.ingredient_name and i.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
join units u on u.name = x.unit_name and u.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
where r.slug = 'vegetable-stir-fry' and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da';

-- -------------------------
-- Tomato Mozzarella Pasta Bake
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
    ('Pasta', 'Gram', 300, 'Pasta', 1),
    ('Tomato', 'Piece', 4, 'Sauce', 2),
    ('Garlic', 'Clove', 2, 'Sauce', 3),
    ('Olive Oil', 'Tablespoon', 1, 'Sauce', 4),
    ('Salt', 'Teaspoon', 1, 'Sauce', 5),
    ('Black Pepper', 'Teaspoon', 1, 'Sauce', 6),
    ('Mozzarella', 'Gram', 200, 'Topping', 7),
    ('Parmesan', 'Gram', 40, 'Topping', 8),
    ('Basil', 'Tablespoon', 2, 'Topping', 9)
) as x(ingredient_name, unit_name, amount, group_name, position) on true
join ingredients i on i.name = x.ingredient_name and i.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
join units u on u.name = x.unit_name and u.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
where r.slug = 'tomato-mozzarella-pasta-bake' and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da';

-- -------------------------
-- Chocolate Banana Overnight Oats
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
    ('Oats', 'Gram', 60, 1),
    ('Milk', 'Milliliter', 150, 2),
    ('Greek Yogurt', 'Gram', 80, 3),
    ('Banana', 'Piece', 1, 4),
    ('Cocoa Powder', 'Tablespoon', 1, 5),
    ('Honey', 'Tablespoon', 1, 6)
) as x(ingredient_name, unit_name, amount, position) on true
join ingredients i on i.name = x.ingredient_name and i.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
join units u on u.name = x.unit_name and u.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da'
where r.slug = 'chocolate-banana-overnight-oats' and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da';

-- =========================================================
-- RECIPE STEPS
-- =========================================================

-- Classic Pancakes
insert into recipe_steps (recipe_id, step_index, text, hint)
select r.id, s.step_index, s.text, s.hint
from recipes r
join (
  values
    (1, 'Mix flour, sugar, baking powder and salt in a bowl.', 'Combine the dry ingredients first.'),
    (2, 'Whisk milk and eggs in a second bowl.', 'This helps avoid lumps later.'),
    (3, 'Add the wet ingredients to the dry ingredients and stir briefly.', 'Do not overmix. A few lumps are fine.'),
    (4, 'Heat butter in a pan over medium heat.', 'Wait until the pan is evenly hot.'),
    (5, 'Pour small portions of batter into the pan and cook until bubbles form.', 'That is the sign to flip.'),
    (6, 'Flip and cook the other side until golden brown.', 'Serve warm.')
) as s(step_index, text, hint) on true
where r.slug = 'classic-pancakes' and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da';

-- Creamy Garlic Pasta
insert into recipe_steps (recipe_id, step_index, text, hint)
select r.id, s.step_index, s.text, s.hint
from recipes r
join (
  values
    (1, 'Cook the pasta in salted water until al dente.', 'Reserve a little pasta water before draining.'),
    (2, 'Melt butter with olive oil in a large pan.', 'Use medium heat so the garlic does not burn.'),
    (3, 'Add minced garlic and cook for about 30 seconds.', 'Stir constantly.'),
    (4, 'Pour in the cream and simmer gently.', 'Do not boil too hard.'),
    (5, 'Add parmesan, salt and black pepper.', 'Stir until smooth.'),
    (6, 'Add the drained pasta and toss until coated.', 'Loosen with pasta water if needed.')
) as s(step_index, text, hint) on true
where r.slug = 'creamy-garlic-pasta' and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da';

-- Chicken Rice Bowl
insert into recipe_steps (recipe_id, step_index, text, hint)
select r.id, s.step_index, s.text, s.hint
from recipes r
join (
  values
    (1, 'Cook the rice in vegetable broth until tender.', 'This adds more flavor than plain water.'),
    (2, 'Season the chicken with paprika, salt and black pepper.', 'Rub the seasoning in well.'),
    (3, 'Cook the chicken in olive oil until golden and fully cooked.', 'Let it rest before slicing.'),
    (4, 'Steam or sauté the vegetables until just tender.', 'Keep some bite for texture.'),
    (5, 'Arrange rice, sliced chicken and vegetables in bowls.', 'Serve immediately.')
) as s(step_index, text, hint) on true
where r.slug = 'chicken-rice-bowl' and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da';

-- Vegetable Stir Fry
insert into recipe_steps (recipe_id, step_index, text, hint)
select r.id, s.step_index, s.text, s.hint
from recipes r
join (
  values
    (1, 'Cut all vegetables into bite-sized pieces.', 'Try to keep sizes even so they cook evenly.'),
    (2, 'Mix soy sauce, honey and black pepper in a small bowl.', 'This is the stir fry sauce.'),
    (3, 'Heat olive oil in a large pan or wok.', 'High heat works best.'),
    (4, 'Cook onion and garlic briefly, then add the other vegetables.', 'Do not overcrowd the pan.'),
    (5, 'Stir fry until the vegetables are crisp-tender.', 'A few browned edges are great.'),
    (6, 'Add the sauce and toss everything together for 1 to 2 minutes.', 'Serve hot.')
) as s(step_index, text, hint) on true
where r.slug = 'vegetable-stir-fry' and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da';

-- Tomato Mozzarella Pasta Bake
insert into recipe_steps (recipe_id, step_index, text, hint)
select r.id, s.step_index, s.text, s.hint
from recipes r
join (
  values
    (1, 'Cook the pasta until slightly underdone, then drain.', 'It will finish cooking in the oven.'),
    (2, 'Sauté garlic in olive oil, then add chopped tomatoes.', 'Cook until the tomatoes soften into a sauce.'),
    (3, 'Season the sauce with salt and black pepper.', 'Taste before baking.'),
    (4, 'Mix the pasta with the tomato sauce and place in a baking dish.', 'Spread evenly.'),
    (5, 'Top with mozzarella, parmesan and basil.', 'Cover the surface well for a nice crust.'),
    (6, 'Bake until bubbly and golden on top.', 'About 20 minutes at 200°C works well.')
) as s(step_index, text, hint) on true
where r.slug = 'tomato-mozzarella-pasta-bake' and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da';

-- Chocolate Banana Overnight Oats
insert into recipe_steps (recipe_id, step_index, text, hint)
select r.id, s.step_index, s.text, s.hint
from recipes r
join (
  values
    (1, 'Mash half of the banana in a jar or bowl.', 'This adds natural sweetness.'),
    (2, 'Add oats, milk, yogurt, cocoa powder and honey.', 'Mix thoroughly.'),
    (3, 'Cover and chill overnight.', 'At least 6 hours is ideal.'),
    (4, 'Top with the remaining banana before serving.', 'Great cold, or slightly warmed.')
) as s(step_index, text, hint) on true
where r.slug = 'chocolate-banana-overnight-oats' and r.owner_id = 'c69a8909-8a14-4a38-9c30-1569defee9da';

commit;