#!/usr/bin/env bash
# Fails if the built site contains internal material. Usage: deploy/leak-scan.sh [_site]
set -u
SITE="${1:-_site}"
fail=0
[ -d "$SITE" ] || { echo "leak-scan: $SITE not found"; exit 2; }

# The term check below needs GNU grep (-P). BSD grep (macOS) lacks -P, and the check would then find
# nothing and report OK. Use GNU grep (ggrep on macOS: brew install grep) or stop.
GREP=grep
if ! printf x | grep -qP x 2>/dev/null; then
  if command -v ggrep >/dev/null 2>&1 && printf x | ggrep -qP x 2>/dev/null; then
    GREP=ggrep
  else
    echo "leak-scan: GNU grep with -P is required (macOS: brew install grep, which provides ggrep)"
    exit 2
  fi
fi

# 1. Forbidden file types and paths (source decks and documents, config, scripts)
bad_files=$(find "$SITE" -type f \( -iname '*.pdf' -o -iname '*.docx' -o -iname '*.xlsx' -o -iname '*.pptx' -o -iname '*.md' -o -iname '*.sh' -o -iname '*.jsonc' -o -iname '*.json' -o -iname '*.yml' -o -iname '*.yaml' -o -iname '*.csv' \) ; \
            find "$SITE" -type d \( -name deploy -o -name .github \))
if [ -n "$bad_files" ]; then echo "leak-scan: forbidden files or folders:"; echo "$bad_files"; fail=1; fi

# 2. Forbidden terms from the internal company deck (confidential marking, commercial and financial plans)
patterns=(
  'Private (&|&amp;) Conf' '(?i)\bconfidential\b' '(?i)monetis|monetiz' '\bARR\b' '(?i)valuation'
  '(?i)revenue' '(?i)incentive payout' '(?i)equity' '\bNoCs?\b' '(?i)board resolution'
)
for p in "${patterns[@]}"; do
  hits=$("$GREP" -r -l -P "$p" "$SITE" --include='*.html' --include='*.xml' --include='*.txt' --include='*.js' 2>/dev/null || true)
  if [ -n "$hits" ]; then echo "leak-scan: pattern '$p' found in:"; echo "$hits" | sed 's/^/  /'; fail=1; fi
done

if [ $fail -eq 0 ]; then echo "leak-scan: OK — $(find "$SITE" -type f | wc -l) files checked"; fi
exit $fail
