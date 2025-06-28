#!/bin/bash

# Clear Cache Script untuk Reza Portfolio
echo "🧹 Membersihkan cache aplikasi..."

# 1. Hapus cache Next.js
echo "📁 Menghapus cache Next.js..."
rm -rf .next/cache
rm -rf .next/static

# 2. Hapus node_modules cache (opsional)
echo "📦 Membersihkan cache node_modules..."
rm -rf node_modules/.cache

# 3. Bersihkan cache pnpm/npm 
echo "🗂️ Membersihkan cache package manager..."
npm cache clean --force 2>/dev/null || echo "npm cache tidak perlu dibersihkan"

# 4. Rebuild aplikasi
echo "🔨 Rebuild aplikasi..."
npm run build

echo "✅ Cache berhasil dibersihkan!"
echo "🌐 Untuk membersihkan cache browser:"
echo "   - Chrome/Edge: Ctrl+Shift+Delete atau Cmd+Shift+Delete"
echo "   - Firefox: Ctrl+Shift+Del atau Cmd+Shift+Del" 
echo "   - Safari: Cmd+Option+E"
echo ""
echo "💡 Tips:"
echo "   - Gunakan hard refresh: Ctrl+F5 (Windows) atau Cmd+Shift+R (Mac)"
echo "   - Buka Developer Tools > Application > Storage > Clear All"
echo "   - Gunakan Incognito/Private mode untuk testing"
