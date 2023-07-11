export const txTypes: {[key: number]: { name: string; description: string; icon: string }} = {
  1: { name: 'genesis', description: 'Genesis', icon: 'mdi-power' },
  4: { name: 'transfer', description: 'Transfer', icon: 'mdi-send' },
  8: { name: 'start_lease', description: 'Lease', icon: 'mdi-file-document-box-plus' },
  9: { name: 'cancel_lease', description: 'Cancel Lease', icon: 'mdi-file-document-box-remove' },
  11: { name: 'mass_transfer', description: 'Mass Transfer', icon: 'mdi-coins' },
  12: { name: 'data', description: 'Data', icon: 'mdi-database' },
  13: { name: 'script', description: 'Script', icon: 'mdi-script-text' },
  15: { name: 'anchor', description: 'Anchor', icon: 'mdi-anchor' },
  16: { name: 'invoke_association', description: 'Association', icon: 'mdi-link-plus' },
  17: { name: 'revoke_association', description: 'Revoke Association', icon: 'mdi-link-off' },
  18: { name: 'sponsor', description: 'Sponsorship', icon: 'mdi-heart' },
  19: { name: 'cancel_sponsor', description: 'Cancel Sponsorship', icon: 'mdi-heart-broken' },
  20: { name: 'register', description: 'Register', icon: 'mdi-file-key-outline' },
  21: { name: 'burn', description: 'Burn', icon: 'mdi-fire' },
  22: { name: 'mapped_anchor', description: 'Mapped Anchor', icon: 'mdi-arrow-bottom-right-thin-circle-outline' },
  23: { name: 'statement', description: 'Statement', icon: 'mdi-bullhorn-variant-outline' }
}
