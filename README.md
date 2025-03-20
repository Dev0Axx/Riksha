Ссылка на проект - https://riksha-three.vercel.app/
Link to the project - https://riksha-three.vercel.app/

Для запуска клиента склонировать репозиторий. В папке с проектом - npm run dev.
To run the client, clone the repository. In the project folder - npm run dev.

Используемый сервер - supabase.
The server used is supabase.
Структура базы данных:
Database structure:
[
{
"table_name": "additionally",
"column_name": "id",
"data_type": "bigint",
"is_nullable": "NO"
},
{
"table_name": "additionally",
"column_name": "created_at",
"data_type": "timestamp with time zone",
"is_nullable": "NO"
},
{
"table_name": "additionally",
"column_name": "name",
"data_type": "character varying",
"is_nullable": "NO"
},
{
"table_name": "additionally",
"column_name": "price",
"data_type": "integer",
"is_nullable": "NO"
},
{
"table_name": "additionally",
"column_name": "img_url",
"data_type": "character varying",
"is_nullable": "NO"
},
{
"table_name": "additionally",
"column_name": "category_id",
"data_type": "bigint",
"is_nullable": "YES"
},
{
"table_name": "categories",
"column_name": "id",
"data_type": "bigint",
"is_nullable": "NO"
},
{
"table_name": "categories",
"column_name": "name",
"data_type": "character varying",
"is_nullable": "NO"
},
{
"table_name": "categories",
"column_name": "sort_order",
"data_type": "integer",
"is_nullable": "NO"
},
{
"table_name": "categories",
"column_name": "created_at",
"data_type": "timestamp with time zone",
"is_nullable": "NO"
},
{
"table_name": "goods",
"column_name": "id",
"data_type": "bigint",
"is_nullable": "NO"
},
{
"table_name": "goods",
"column_name": "created_at",
"data_type": "timestamp with time zone",
"is_nullable": "NO"
},
{
"table_name": "goods",
"column_name": "name",
"data_type": "character varying",
"is_nullable": "NO"
},
{
"table_name": "goods",
"column_name": "img_url",
"data_type": "character varying",
"is_nullable": "NO"
},
{
"table_name": "goods",
"column_name": "description",
"data_type": "character varying",
"is_nullable": "NO"
},
{
"table_name": "goods",
"column_name": "price",
"data_type": "integer",
"is_nullable": "NO"
},
{
"table_name": "goods",
"column_name": "category_id",
"data_type": "bigint",
"is_nullable": "NO"
},
{
"table_name": "goods",
"column_name": "sizes",
"data_type": "ARRAY",
"is_nullable": "YES"
},
{
"table_name": "profiles",
"column_name": "id",
"data_type": "bigint",
"is_nullable": "NO"
},
{
"table_name": "profiles",
"column_name": "user_id",
"data_type": "uuid",
"is_nullable": "YES"
},
{
"table_name": "profiles",
"column_name": "username",
"data_type": "text",
"is_nullable": "YES"
},
{
"table_name": "profiles",
"column_name": "created_at",
"data_type": "timestamp with time zone",
"is_nullable": "YES"
},
{
"table_name": "profiles",
"column_name": "updated_at",
"data_type": "timestamp with time zone",
"is_nullable": "YES"
}
]
