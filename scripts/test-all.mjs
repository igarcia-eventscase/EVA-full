#!/usr/bin/env node
// Simple cross-platform test runner for all EVA submodules.
// Runs unit tests in each project sequentially so that failures stop the pipeline.
// Integration tests (EVA-integration-tests) are executed last because they rely on the others.

import { spawnSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const MODULES = [
  { name: 'EVA-analytics-react', path: 'EVA-analytics-react', script: 'test:run' },
  { name: 'EVA-node', path: 'EVA-node', script: 'test' },
  { name: 'EVA-workers', path: 'EVA-workers', script: 'test' },
  // Integration tests depend on the above projects
  { name: 'EVA-integration-tests', path: 'EVA-integration-tests', script: 'test' },
];

let exitCode = 0;

for (const mod of MODULES) {
  console.log(`\n—— Running tests for ${mod.name} ——`);
  const result = spawnSync('npm', ['run', mod.script, '--silent'], {
    cwd: join(__dirname, '..', mod.path),
    stdio: 'inherit',
    shell: true,
  });

  if (result.status !== 0) {
    console.error(`\n❌ Tests failed in ${mod.name}. Aborting.`);
    exitCode = result.status ?? 1;
    break;
  }
}

process.exit(exitCode); 