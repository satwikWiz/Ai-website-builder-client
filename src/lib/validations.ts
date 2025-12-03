export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  if (!trimmed) return false
  
  try {
    const urlObj = new URL(trimmed)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

export function getUrlValidationError(url: string): string | null {
  if (!url || !url.trim()) {
    return 'Please enter a website URL'
  }
  
  if (!isValidUrl(url)) {
    return 'Please enter a valid URL (must start with http:// or https://)'
  }
  
  return null
}

export function isValidDomain(domain: string): boolean {
  if (!domain || typeof domain !== 'string') return false
  const trimmed = domain.trim()
  if (!trimmed) return false
  
  // Domain validation: alphanumeric, hyphens, dots, 1-63 chars per label, max 253 total
  const domainRegex = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i
  if (!domainRegex.test(trimmed)) return false
  
  // Check length
  if (trimmed.length > 253) return false
  
  // Check it doesn't start or end with dot or hyphen
  if (trimmed.startsWith('.') || trimmed.endsWith('.') || 
      trimmed.startsWith('-') || trimmed.endsWith('-')) {
    return false
  }
  
  return true
}

export function getDomainValidationError(domain: string): string | null {
  if (!domain || !domain.trim()) {
    return 'Please enter a domain name'
  }
  
  if (!isValidDomain(domain)) {
    return 'Please enter a valid domain name (e.g., my-domain or example.com)'
  }
  
  return null
}

