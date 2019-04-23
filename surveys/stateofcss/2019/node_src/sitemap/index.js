const fs = require('fs')
const { findIndex, findLastIndex, omit } = require('lodash')
const yaml = require('js-yaml')

exports.pageFromConfig = (stack, config, parent) => {
    const page = {
        ...config,
        path: parent === undefined ? config.path : `${parent.path.replace(/\/$/, '')}${config.path}`,
        is_hidden: !!config.is_hidden,
        children: []
    }
    // if page has no defaultBlockType, get it from parent
    if (!page.defaultBlockType) {
        page.defaultBlockType = parent && parent.defaultBlockType || 'default'
    }

    if (!page.path.endsWith('/')) {
        page.path = `${page.path}/`
    }

    if (Array.isArray(page.blocks)) {
        page.blocks = page.blocks.map(block => {
            // block can either be a string (used as `id`); or an object with an `id` property
            const blockObject = typeof block === 'string' ? { id: block } : block
            // if block type is missing, get it from parent
            if (!blockObject.type) {
                blockObject.type = page.defaultBlockType
            }
            return {
                ...blockObject,
                path: `${page.path}${block}/`
            }
        })
    }

    if (parent === undefined) {
        stack.hierarchy.push(page)
    }
    stack.flat.push(page)

    if (Array.isArray(config.children)) {
        config.children.forEach(child => {
            page.children.push(exports.pageFromConfig(stack, child, page))
        })
    }

    return page
}

let computedSitemap = null

exports.computeSitemap = async (rawSitemap) => {
    if (computedSitemap !== null) {
        return computedSitemap
    }

    const stack = {
        flat: [],
        hierarchy: []
    }

    rawSitemap.forEach(item => {
        exports.pageFromConfig(stack, item)
    })

    // assign prev/next page using flat pages
    stack.flat.forEach(page => {
        const index = findIndex(stack.flat, p => p.path === page.path)
        const previous = stack.flat[index - 1]
        if (previous !== undefined && previous.is_hidden !== true) {
            page.previous = omit(previous, [
                'is_hidden',
                'previous',
                'next',
                'children',
                'blocks'
            ])
        }

        const lastIndex = findLastIndex(stack.flat, p => p.path === page.path)
        const next = stack.flat[lastIndex + 1]
        if (next !== undefined && next.is_hidden !== true) {
            page.next = omit(next, [
                'is_hidden',
                'previous',
                'next',
                'children',
                'blocks'
            ])
        }
    })

    const sitemapContent = [
        `###################################################################`,
        `# DO NOT EDIT`,
        `###################################################################`,
        `# this file was generated by \`gatsby-node.js\``,
        `# please edit \`raw_sitemap.yaml\` instead.`,
        `###################################################################`,
        yaml.dump(stack.hierarchy, { noRefs: true }),
    ].join('\n')
    await fs.writeFileSync('./config/sitemap.yml', sitemapContent)

    return stack
}
