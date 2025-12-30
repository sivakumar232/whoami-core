import { prisma } from './lib/db'

async function checkElements() {
    console.log('=== Checking Elements by User ===\n')

    const users = await prisma.user.findMany({
        include: {
            elements: true
        },
        orderBy: { createdAt: 'desc' }
    })

    users.forEach((user) => {
        console.log(`User: ${user.username} (${user.email})`)
        console.log(`  Clerk ID: ${user.clerkId}`)
        console.log(`  Elements: ${user.elements.length}`)

        if (user.elements.length > 0) {
            user.elements.forEach((el, i) => {
                console.log(`    ${i + 1}. ${el.type} at (${el.x}, ${el.y})`)
            })
        }
        console.log('')
    })

    await prisma.$disconnect()
}

checkElements().catch(console.error)
