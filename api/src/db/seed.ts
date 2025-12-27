import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

async function main() {
  // Conexión directa para el script
  const client = createClient({ url: 'file:local.db' });
  const db = drizzle(client, { schema });

  console.log('--- Limpiando base de datos ---');
  await db.delete(schema.expenses);

  console.log('--- Insertando datos de prueba ---');
  
  await db.insert(schema.expenses).values([
    {
      description: 'Suscripción Netflix',
      amount: 15.99,
      category: 'Entretenimiento',
      billType: 'Mensual',
    },
    {
      description: 'Compra Supermercado',
      amount: 85.50,
      category: 'Alimentación',
      billType: 'Variable',
    },
    {
      description: 'Factura Electricidad',
      amount: 42.00,
      category: 'Servicios',
      billType: 'Mensual',
    },
    {
      description: 'Internet Fibra',
      amount: 30.00,
      category: 'Servicios',
      billType: 'Fijo',
    }
  ]);

  console.log('--- ¡Datos insertados con éxito! ---');
  process.exit(0);
}

main().catch((err) => {
  console.error('Error al insertar datos:', err);
  process.exit(1);
});