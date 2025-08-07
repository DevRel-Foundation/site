---
title: "Persona Library Moves to Incubation Stage"
excerpt: "The Persona Library aims to capture the sociology behind developer community and technology adoption."
author: "@j12y"
date: "2025-05-25"
category: "pro-lead"
tags: ["persona-library"]
image: "/images/blog/devrel-foundation-persona-library.png"
---

Many roles in traditional organizations struggle to find a way to communicate with and about the developer segment. That's why a newly minted Head of Developer Relations or Developer Relations Manager may be brought in to spearhead future community, advocacy, or evangelism efforts from a software development background because of their expertise at understanding the developer mindset and persona. Developer marketing often requires a more nuanced approach from other types of marketing.

- what does a developer read?
- where does a developer go?
- how do we convince a developer to adopt our project or product?

The answer as is so often the case, "it depends".  The [Persona Library](https://github.com/DevRel-Foundation/persona-library) initiative was started to embrace the variations and try to capture the sociology behind developer community and technology adoption through structured, reusable developer personas. It is approached as an open-data problem because like toothbrushes, we all agree they are a good idea but don't want to use somebody else's.

The move to an **Incubation** stage indicates that this project has advanced beyond early sandbox and prototypes. Effort is underway and the beginnings of a persona schema are taking shape. This is the precursor to the _Graduation_ stage indicating that as of today early adopters can start getting immediate value, but there may still be shifts as feedback and contributions help it grow.

## Why JSON and Not Powerpoint?

From the [Persona Library Glossary](https://github.com/DevRel-Foundation/persona-library/blob/main/docs/reference/glossary.md#persona), a **persona** is:

> A research-based, semi-fictional representation of your target audience or users that embodies their characteristics, behaviors, goals, and pain points.

There are many templates, generators, and frameworks for creating personas including well-established methodologies used in marketing, ux design, and product management. The [Persona Reference Library](https://github.com/DevRel-Foundation/persona-library/tree/main?tab=readme-ov-file#persona-reference-library) has already gathered a few dozen **books, videos, and articles** about persona development if you want to dive deeper into past ideas.

We inherently know we should approach our communities strategically, so we seek out personas, but then we don't use them or know what to do with them. Where definitions that show up on a powerpoint slide often fall short are because they are:

- too generic
- too specific
- too bespoke
- too difficult to use
- too difficult to find examples

Some of those challenges may sound contradictory but speak to the problem of focusing on the wrong persona traits. The lack of success often comes from the fact that we don't use persona definitions or [ideal customer profile](https://github.com/DevRel-Foundation/persona-library/blob/main/docs/reference/glossary.md#ideal-customer-profile) (ICP) documentation in our workflows.  Getting organizational alignment is hard enough and requires frequent repetition, otherwise our behaviors change, we don't bring new members of the team up to speed, and all the work that went into creating personas in the first place has limited lasting value.

Defining personas based on a data schema gives us a number of advantages:

- [x] inherit traits from other personas to customize them
- [x] validate and transform personas for different use cases
- [x] merge, split, and share with other organizations
- [x] extract and load persona data with other systems of record


## The Complexity of Technical Decision-Making

Traditional personas are often straightforward demographic and behavioral profiles. _What role does this person have? What are their pain points? How do they make purchasing decisions?_

The [Persona Library](https://github.com/DevRel-Foundation/persona-library) acknowledges this complexity with structured attributes that go beyond basic demographics. For example, a "Senior Backend Engineer" might be an individual contributor today but an architecture decision influencer tomorrow. They could be evaluating your API for a side project while simultaneously recommending against it at work due to compliance concerns. Inexplicably, knowing a job title is both helpful and meaningless at the same time. It was a short-cut to create a definition but a distraction when it comes to executing on it.

By treating personas as structured data with rich behavioral traits, we can help teams who may think differently about developers with discovery and program planning.

## Cross-Team Alignment and Cross-Org Collaboration

Personality assessments use a series of questions to categorize an individual's profile into buckets. Using this shorthand notation, it is easy to share heuristics about how to understand or work effectively with somebody based on a commonly shared identifier.

- An INTJ in the Myers Briggs Type Indicator (MBTI) system
- A Restorative, Analytical, Achiever in the Gallup CliftonStrengths
- A Type 9 Peacemaker in the Enneagram System (RHETI)

The DEVREL-PLS similarly models personas after mutually exclusive deterministic [traits](https://github.com/DevRel-Foundation/persona-library/tree/main/docs/traits). In fact, the categories of this blog are based off of the combination of `role-level` and `role-experience`.

DevRel roles interact cross-functionally with marketing, product, engineering, and sales so a standard terminology and central reference can be a valuable resource. DevRel roles interact with agencies and partners who don't have access to the same wiki and document stores. This gives a common language when collaborating beyond organizational bounds. When transitioning from one company to another, the onboarding experience of understanding and learning the target personas becomes all the more smooth.

The Persona library takes this into consideration by segmenting personas into inheritance trees:

```json
{
    "id": "security-dev-majority-lead",
    "label": "Security Practitioner",
    "parent": ["dev"],
    "segment": "security",
    ...
}
```

 and department specific tactics:

```json
{
    ...
    "strategies": {
        "design": [
            "Seek simplicity and elegance for a functional rather than aesthetic purpose.",
            ...
        ],
        "product": [
            "Get to a wow moment quickly. This persona is likely evaluating multiple alternatives with a finite amount of time to make a decision and can't go through a long onboarding.",
            ...
        ],
        "education": [
            "Base content on the learning modality trait with types of educational content.",
            ...
        ],
        "communications": [
            "Communicate to devs with direct and concise messages rather than overly verbose or promotional communication styles.",
            ...
        ],
        "sales": [
            "Accept that this perona will rigorously evaluate and want to kick the tires for themselves and not take your word for it.",
            ...
        ],
        "marketing": [
            "Market to devs with care because they are a skeptical audience for any claims and language that sound like hyperbole.",
            ...
        ]
    }
}
```

[Explore the Persona Library System tutorials...](https://github.com/DevRel-Foundation/persona-library/tree/main?tab=readme-ov-file#learning-the-devrel-pls) to learn more about how it works and how to use it.


## Getting Started with the Persona Library

This project is still evolving, but the foundation is in place.

- [x] open data format 
- [x] persona schema
- [x] validation tools
- [x] [contribution workflow](https://github.com/DevRel-Foundation/persona-library/blob/main/CONTRIBUTING.md) and [getting started guide](https://github.com/DevRel-Foundation/persona-library/blob/main/docs/guides/getting-started.md) 

What comes next depends on community adoption and feedback.

- [ ] generating documents and views from the data for non-technical stakeholders
- [ ] persona discovery tools (search, filtering, comparison)
- [ ] integration templates and tools
- [ ] cross-reference with tools, events, and content strategies

We especially need DevRel leaders and project team managers who can act as persona champions, validate existing personas against their real-world experience, and contribute new personas observations that reflect diverse developer communities. [Join us](/join-us) in the next working group and help shape how we understand and serve developer audiences.
