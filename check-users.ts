import { prisma } from './lib/db'

async function checkUsers() {
    console.log('=== Checking User Table ===\n')

    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20
    })

    console.log(`Total users found: ${users.length}\n`)

    users.forEach((user, index) => {
        console.log(`User ${index + 1}:`)
        console.log(`  ID: ${user.id}`)
        console.log(`  Clerk ID: ${user.clerkId}`)
        console.log(`  Username: ${user.username}`)
        console.log(`  Email: ${user.email}`)
        console.log(`  Created: ${user.createdAt}`)
        console.log('')
    })

    // Check for duplicate clerkIds
    const clerkIds = users.map(u => u.clerkId)
    const duplicateClerkIds = clerkIds.filter((id, index) => clerkIds.indexOf(id) !== index)

    if (duplicateClerkIds.length > 0) {
        console.log('⚠️  DUPLICATE CLERK IDs FOUND:')
        duplicateClerkIds.forEach(id => console.log(`  - ${id}`))
    } else {
        console.log('✅ No duplicate Clerk IDs')
    }

    // Check for duplicate usernames
    const usernames = users.map(u => u.username)
    const duplicateUsernames = usernames.filter((name, index) => usernames.indexOf(name) !== index)

    if (duplicateUsernames.length > 0) {
        console.log('\n DUPLICATE USERNAMES FOUND:')
        duplicateUsernames.forEach(name => console.log(`  - ${name}`))
    } else {
        console.log('✅ No duplicate usernames')
    }

    await prisma.$disconnect()
}

checkUsers().catch(console.error)
