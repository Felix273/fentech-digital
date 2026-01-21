module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/case-studies/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/case-studies/data.ts
__turbopack_context__.s([
    "caseStudiesData",
    ()=>caseStudiesData
]);
const caseStudiesData = [
    {
        id: "insurance-big-data",
        category: "Cloud Hosting",
        title: "Major Insurance Provider Saves $750k per Month With Big Data Migration",
        industry: "Banks & Insurance",
        about: "Paysafe provides payment solutions that power the everyday. The multinational organisation operates multiple brands across the e-cash, payments processing and digital wallets spectrum, serving over 145 million customers.",
        rating: "5/5",
        reviewCount: "31 Reviews",
        stats: [
            {
                val: "30,000+",
                label: "Hours delivered back to the business"
            },
            {
                val: "100%",
                label: "SOX compliance in Settlement process automation"
            },
            {
                val: "95%+",
                label: "Success rate of bot case completion"
            },
            {
                val: "6+",
                label: "For functional release of OBT, RTS and OGS"
            }
        ],
        challenge: "Following a period of rapid growth through acquisition, Paysafe were looking to achieve enterprise-wide operational efficiencies and alignment.",
        challengeDetails: [
            "Lack of process consistency & standardisation across acquired brands.",
            "Numerous manual and non-transparent processes requiring address.",
            "Increasing industry regulation and compliance requirements."
        ],
        solutionTitle: "What did Fentech do?",
        solutionDetails: [
            {
                title: "Automation Delivery",
                desc: "Working with the Automation365 team to identify, design, build, test and deploy automated solutions using UiPath. Delivered 28 Automations across Merchant Services, Consumer Services and Risk."
            },
            {
                title: "Mobile Chatbot Migration",
                desc: "Led the migration of chatbots from web browser platform to mobile (Android/iOS) and implemented an intermediate communication layer for seamless live-agent handoff."
            }
        ],
        results: [
            "30+ processes delivered",
            "Over 30,000 hrs delivered back to the business",
            "100% SOX compliance in Settlement process automation",
            "95% success rate of bot case completion",
            "SDK delivered for native platforms (Virtual & Live agent communications)"
        ],
        techStack: [
            "JavaScript",
            "TypeScript",
            "Node.JS",
            "React",
            "Swift",
            "Java",
            "Objective-C",
            "RxJava"
        ],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
    },
    {
        id: "coffee-success-story",
        category: "IT Consulting",
        title: "Maximizing Efficiency with Proper Technology Implementation – Coffee Success Story",
        industry: "Retail & Supply Chain",
        about: "A global coffee distributor seeking to modernize their legacy infrastructure to support a rapidly expanding network of premium retail locations.",
        rating: "5/5",
        reviewCount: "24 Reviews",
        stats: [
            {
                val: "22%",
                label: "Reduction in supply chain overhead"
            },
            {
                val: "14 countries",
                label: "Seamless regional rollout"
            },
            {
                val: "100%",
                label: "Inventory accuracy achieved"
            },
            {
                val: "24/7",
                label: "Real-time monitoring enabled"
            }
        ],
        challenge: "The company needed to complete a complex migration on a tight deadline to avoid millions of dollars in post-contract fees and fines.",
        challengeDetails: [
            "Complex migration on a tight deadline.",
            "Avoiding millions of dollars in post-contract fees.",
            "Integration of siloed data across international borders."
        ],
        solutionTitle: "How Fentech Assisted",
        solutionDetails: [
            {
                title: "Modern Infrastructure",
                desc: "Provisioning a scalable cloud environment to replace aging on-premise servers."
            },
            {
                title: "Consulting Services",
                desc: "Strategic advisory on technology implementation to ensure zero-downtime during the migration phase."
            }
        ],
        results: [
            "Avoided $2M+ in potential fines",
            "Modern infrastructure implementation",
            "Improved retail data transparency",
            "Successful global implementation"
        ],
        techStack: [
            "AWS",
            "Python",
            "Docker",
            "PostgreSQL",
            "Terraform"
        ],
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80"
    },
    {
        id: "london-travel-safety",
        category: "Mobile Development",
        title: "Strategic Move to an AI-supported application for Public Safety Travel App in London",
        industry: "Government & Transport",
        about: "A public safety initiative focused on helping commuters navigate London with real-time safety updates and live travel data.",
        rating: "4.9/5",
        reviewCount: "115 Reviews",
        stats: [
            {
                val: "1.2M",
                label: "Active monthly users"
            },
            {
                val: "300ms",
                label: "Average route calculation time"
            },
            {
                val: "85%",
                label: "User safety satisfaction rating"
            },
            {
                val: "Live",
                label: "Updates for all TFL lines"
            }
        ],
        challenge: "Commuters needed a reliable way to map safe routes and receive live travel updates in an increasingly complex urban environment.",
        challengeDetails: [
            "Requirement for real-time data synchronization.",
            "Need for safe-route AI algorithms.",
            "High concurrency during peak travel hours."
        ],
        solutionTitle: "Fentech Digital Engineering",
        solutionDetails: [
            {
                title: "AI Journey Planner",
                desc: "Development of a journey planner that maps safe routes based on live incident data."
            },
            {
                title: "Native Mobile Build",
                desc: "Building a high-performance app for Android and iOS that provides live travel updates."
            }
        ],
        results: [
            "Confidence-driven travel for Londoners",
            "Modern AI infrastructure",
            "Seamless real-time travel updates",
            "Integration with London's maps API"
        ],
        techStack: [
            "React Native",
            "Firebase",
            "TensorFlow",
            "Google Maps API",
            "Node.JS"
        ],
        image: "https://images.unsplash.com/photo-1512428559083-a401a30c9550?auto=format&fit=crop&q=80"
    },
    {
        id: "paysafe-rewards",
        category: "App Development",
        title: "Convenience, savings, and rewards at your fingertips",
        industry: "Fintech",
        about: "A centralized platform for a major payment provider aimed at unifying multiple brand identities under a single rewards ecosystem.",
        rating: "5/5",
        reviewCount: "42 Reviews",
        stats: [
            {
                val: "40%",
                label: "Increase in user retention"
            },
            {
                val: "Ksh 50M+",
                label: "Saved in operational silos"
            },
            {
                val: "Instant",
                label: "Reward processing speed"
            },
            {
                val: "Global",
                label: "Currency support"
            }
        ],
        challenge: "Paysafe’s fast-paced expansion had resulted in a lack of process consistency & standardisation across their acquired brands.",
        challengeDetails: [
            "Fragmented user experience across multiple apps.",
            "High cost of maintaining separate rewards engines.",
            "Need for digital transformation across disparate brands."
        ],
        solutionTitle: "Our Strategic Approach",
        solutionDetails: [
            {
                title: "Digital Transformation",
                desc: "Standardizing the rewards engine into a single microservices-based API."
            },
            {
                title: "User Experience Design",
                desc: "Creating a unified mobile interface that prioritizes convenience and savings."
            }
        ],
        results: [
            "Standardised process consistency",
            "Unified brand experience",
            "Successful digital transformation",
            "Direct boost in user rewards engagement"
        ],
        techStack: [
            "Kotlin",
            "Swift UI",
            "Go",
            "Kubernetes",
            "Redis"
        ],
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80"
    }
];
}),
"[project]/app/case-studies/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CaseStudyDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
// app/case-studies/[id]/page.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$case$2d$studies$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/case-studies/data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
function CaseStudyDetail({ params }) {
    // Find the specific case study by the ID in the URL
    const project = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$case$2d$studies$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["caseStudiesData"].find((p)=>p.id === params.id);
    if (!project) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])(); // Shows 404 if project doesn't exist
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "w-full pt-32 pb-20 bg-slate-50 flex justify-center border-b border-slate-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[85%] max-w-7xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-6 block",
                            children: project.category
                        }, void 0, false, {
                            fileName: "[project]/app/case-studies/[id]/page.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl md:text-6xl font-bold text-slate-900 mb-8 max-w-4xl tracking-tight leading-tight",
                            children: project.title
                        }, void 0, false, {
                            fileName: "[project]/app/case-studies/[id]/page.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-medium text-slate-500",
                            children: [
                                "Industry: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-slate-900",
                                    children: project.industry
                                }, void 0, false, {
                                    fileName: "[project]/app/case-studies/[id]/page.tsx",
                                    lineNumber: 22,
                                    columnNumber: 63
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/case-studies/[id]/page.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/case-studies/[id]/page.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/case-studies/[id]/page.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "w-full flex justify-center py-24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[85%] max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-8",
                    children: project.stats.map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t-2 border-blue-600 pt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-4xl font-black text-slate-900 mb-2",
                                    children: stat.val
                                }, void 0, false, {
                                    fileName: "[project]/app/case-studies/[id]/page.tsx",
                                    lineNumber: 31,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-500 font-medium",
                                    children: stat.label
                                }, void 0, false, {
                                    fileName: "[project]/app/case-studies/[id]/page.tsx",
                                    lineNumber: 32,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/case-studies/[id]/page.tsx",
                            lineNumber: 30,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/case-studies/[id]/page.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/case-studies/[id]/page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-3",
                children: project.techStack.map((tech)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "px-6 py-3 bg-slate-100 rounded-xl text-slate-900 font-bold text-sm",
                        children: tech
                    }, tech, false, {
                        fileName: "[project]/app/case-studies/[id]/page.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/case-studies/[id]/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/case-studies/[id]/page.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/case-studies/[id]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/case-studies/[id]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f45d63ca._.js.map