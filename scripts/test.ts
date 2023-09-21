const { PrismaClient } = require('@prisma/client');

const dbd = new PrismaClient();

async function main() {
    try {
      await dbd.computeIns.create({
        data: 
          {
            userId: "2132352ds",
            userName : "John",
            instances: {
                create: [
                  {
                    name: "node",
                    computeinsId : "2131dsf23",
                    description: "hellotesting",
                    zone: "asia-south-1",
                  },
                ],
              },
            }
      
      });
    } catch (error) {
      console.error('Error seeding default categories:', error);
    } finally {
      await dbd.$disconnect();
    }
  }
  
  main();
  