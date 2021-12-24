module.exports = {
    root: true,
    plugins: [
        '@nrwl/nx',
        'simple-import-sort',
        'unused-imports',
        'prettier',
        '@typescript-eslint',
    ],
    extends: ['prettier'],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
            rules: {
                '@nrwl/nx/enforce-module-boundaries': [
                    'error',
                    {
                        enforceBuildableLibDependency: true,
                        allow: [],
                        depConstraints: [
                            {
                                sourceTag: '*',
                                onlyDependOnLibsWithTags: ['*'],
                            },
                        ],
                    },
                ],
                'unused-imports/no-unused-imports': 2,
                'prettier/prettier': 'error',
                'lines-between-class-members': [
                    2,
                    'always',
                    { exceptAfterSingleLine: true },
                ],
                'padding-line-between-statements': [
                    2,
                    { blankLine: 'always', prev: 'function', next: '*' },
                    { blankLine: 'always', prev: '*', next: 'function' },
                    { blankLine: 'always', prev: 'export', next: '*' },
                    { blankLine: 'always', prev: '*', next: 'export' },
                    { blankLine: 'always', prev: 'multiline-const', next: '*' },
                    { blankLine: 'always', prev: '*', next: 'return' },
                ],
                'simple-import-sort/imports': 'error',
                'import/prefer-default-export': 0,
                '@typescript-eslint/no-namespace': 'off',
            },
        },
        {
            files: ['**/*.ts', '**/*.tsx'],
            extends: ['plugin:@nrwl/nx/typescript'],
            rules: { '@typescript-eslint/no-namespace': 'off' },
        },
        {
            files: ['*.js', '*.jsx'],
            extends: ['plugin:@nrwl/nx/javascript'],
            rules: {},
        },
    ],
};
