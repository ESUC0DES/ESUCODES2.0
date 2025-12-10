/**
 * CSRF Token Hidden Input Component
 * 
 * Renders a hidden input field for CSRF token in forms.
 * This component is used to include the CSRF token in form submissions.
 */

interface CsrfInputProps {
  token: string
}

export default function CsrfInput({ token }: CsrfInputProps) {
  return <input type="hidden" name="csrf_token" value={token} />
}

