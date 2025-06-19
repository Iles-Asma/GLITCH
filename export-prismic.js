import { createClient } from '@prismicio/client'
import fs from 'fs/promises'
import path from 'path'

// 🔧 CONFIGURATION - Modifiez ces valeurs
const REPO_NAME = 'bugmagazine' // Ex: 'glitch-portfolio'
const ACCESS_TOKEN = 'MC5hRlNUYUJBQUFCNEFwLVhR.77-9MFbvv71YCknvv73vv73vv70UPlB077-977-9BypHLe-_ve-_ve-_ve-_vQRXP--_ve-_vVFJFA' // Si repo privé, sinon laissez vide

async function exportPrismic() {
    try {
        console.log('🚀 Export du projet GLITCH en cours...')

        const client = createClient(REPO_NAME, {
            accessToken: ACCESS_TOKEN || undefined
        })

        // Récupérer tous les documents
        const documents = await client.dangerouslyGetAll()
        const repository = await client.getRepository()

        // Créer le dossier d'export
        const exportDir = `./glitch-export-${new Date().toISOString().split('T')[0]}`
        await fs.mkdir(exportDir, { recursive: true })

        // Sauvegarder les données
        await fs.writeFile(
            path.join(exportDir, 'documents.json'),
            JSON.stringify(documents, null, 2)
        )

        await fs.writeFile(
            path.join(exportDir, 'repository.json'),
            JSON.stringify(repository, null, 2)
        )

        // Créer un résumé
        const summary = {
            exportDate: new Date().toISOString(),
            repositoryName: REPO_NAME,
            totalDocuments: documents.length,
            documentTypes: [...new Set(documents.map(doc => doc.type))],
            languages: repository.languages?.map(lang => lang.id) || ['fr-fr']
        }

        await fs.writeFile(
            path.join(exportDir, 'summary.json'),
            JSON.stringify(summary, null, 2)
        )

        console.log('✅ Export terminé!')
        console.log(`📁 Dossier: ${exportDir}`)
        console.log(`📄 ${documents.length} documents exportés`)
        console.log(`🏷️  Types: ${summary.documentTypes.join(', ')}`)

        return exportDir

    } catch (error) {
        console.error('❌ Erreur lors de l\'export:', error.message)
        if (error.message.includes('Repository not found')) {
            console.log('💡 Vérifiez le nom du repository dans REPO_NAME')
        }
    }
}

exportPrismic()