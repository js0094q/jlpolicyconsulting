import Foundation
import AppKit
import CoreGraphics
import CoreImage
import CoreText
import ImageIO

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let outputURL = root.appendingPathComponent("output/pdf/portfolio_brief.pdf")
let logoURL = root.appendingPathComponent("output/imagegen/jlpc_letterhead_mark_v2.png")

struct PageContent {
    let title: String
    let subtitle: String
    let intro: String
    let bullets: [String]
    let sources: String
    let imageName: String
}

let pages: [PageContent] = [
    PageContent(
        title: "Joseph Stewart | Market Access, Reimbursement, and Policy Strategy",
        subtitle: "Portfolio brief for complex provider-administered products across the lifecycle",
        intro: "This brief shows how Joseph translates reimbursement mechanics into commercially usable strategy. The fit is specific: provider-administered products where launch economics, mid-cycle durability, site-of-care economics, formulary management, and 340B exposure determine adoption.",
        bullets: [
            "More than 10 years across reimbursement, pricing, market access, and health policy.",
            "Biosimilars manufacturer experience with ASP evolution, payer/provider/GPO dynamics, and commercialization barriers.",
            "Current consulting work that bridges Medicare, Medicaid, commercial, launch readiness, and reimbursement risk.",
            "Prior work across manufacturer, trade association, and advisory settings shows policy-to-commercial translation, not just policy commentary."
        ],
        sources: "Selected sources: resume set, anonymized inpatient launch materials, response draft, CMS NTAP guidance [O1][O2][O15].",
        imageName: "visuals/reimbursement_pathway_map.png"
    ),
    PageContent(
        title: "Launch Economics Pressure Map",
        subtitle: "Launch volume can rise while realized net falls",
        intro: "Launch economics should be benchmarked against what established analogs and mid-cycle products already absorb. Joseph's work separates the pressure points that erode realized net from the signals that actually show market readiness.",
        bullets: [
            "Reimbursement lag, hospital absorption, operational burden, 340B concentration, contracting pressure, and channel leakage compound quickly.",
            "Launch signal quality should be judged against on-market analogs, not against an average forecast that ignores site mix.",
            "The question is not whether demand appears; it is whether the economics are durable enough to support it.",
            "Launch support should be sized to the site and channel economics, not to a single national average."
        ],
        sources: "Selected sources: CMS IPPS, OPPS, PFS, Part B ASP, and HRSA 340B guidance [O3][O4][O7][O8][O9][O11][O13].",
        imageName: "visuals/launch_economics_pressure_map.png"
    ),
    PageContent(
        title: "On-Market / Mid-Cycle Landscape Assessment",
        subtitle: "Benchmark established products to understand normal market behavior",
        intro: "This view is not a launch view. It is a lifecycle benchmark that shows how mature products behave once reimbursement is established, channel patterns settle, and 340B, formulary, or contract refresh start shaping realized net.",
        bullets: [
            "Reimbursement maturity changes the question from 'can it launch?' to 'is the mix still defensible?'",
            "Site-of-care sensitivity, GTN exposure, formulary placement, and channel behavior become the right benchmark variables.",
            "Mid-cycle products often erode quietly through contract refresh, 340B mix, benefit migration, and channel drift rather than through a headline price event.",
            "This view shows whether a product is normal, deteriorating, or already over-concentrated in advantaged channels."
        ],
        sources: "Selected sources: CMS payment guidance, HRSA 340B materials, and Joseph's cross-site reimbursement and pricing analyses [O3][O4][O8][O11][I3][I4].",
        imageName: "visuals/on_market_midcycle_landscape_assessment.png"
    ),
    PageContent(
        title: "Recoverable vs Structural Losses",
        subtitle: "Separate unavoidable economics from controllable leakage",
        intro: "The strategy problem is not just to identify losses. It is to distinguish structural economics from the items Joseph can help recover through better channel design, reimbursement mechanics, or evidence strategy.",
        bullets: [
            "Structural: baseline policy exposure, statutory constraints, and durable site-of-care economics.",
            "Recoverable: coding visibility gaps, timing misses, segment mix problems, and channel-design errors.",
            "The point is to stop treating all leakage as the same problem.",
            "The output should be a prioritized recovery roadmap, not a generic access narrative."
        ],
        sources: "Selected sources: CMS NTAP, OPPS, PFS, and HRSA 340B guidance; internal workstream materials [O1][O4][O8][O11][I2][I3][I4].",
        imageName: "visuals/recoverable_vs_structural_losses.png"
    ),
    PageContent(
        title: "Joseph's Operating Method",
        subtitle: "Assess -> Quantify -> Segment -> Stress-test -> Recover -> Operationalize",
        intro: "The output is not a memo. It is a decision system that commercial, market access, and field teams can use to act on reimbursement reality.",
        bullets: [
            "Assess & benchmark: map reimbursement pathways, decision dependencies, and on-market analog behavior by site and channel.",
            "Quantify: build provider margin, reimbursement timing, GTN pressure, and lifecycle-delta buckets.",
            "Segment: prioritize accounts by economics, mix, and adoption readiness.",
            "Stress-test: run scenario ranges for launch, mid-cycle, and mature payment states.",
            "Recover: deploy targeted coding, contracting, channel, and support levers.",
            "Operationalize: convert strategy into field tools, KPIs, and governance cadence."
        ],
        sources: "Selected sources: CMS NTAP, OPPS, PFS, and HRSA 340B guidance; internal workstream materials [O1][O4][O8][O11][I2][I3][I4].",
        imageName: "visuals/joseph_approach_framework.png"
    )
]

func loadImage(_ path: String) -> CGImage? {
    let url = URL(fileURLWithPath: path)
    guard let src = CGImageSourceCreateWithURL(url as CFURL, nil) else { return nil }
    return CGImageSourceCreateImageAtIndex(src, 0, nil)
}

func attributed(_ text: String, font: NSFont, color: NSColor, lineSpacing: CGFloat = 3.0, alignment: NSTextAlignment = .left) -> NSAttributedString {
    let style = NSMutableParagraphStyle()
    style.lineSpacing = lineSpacing
    style.alignment = alignment
    let ctFont = CTFontCreateWithName(font.fontName as CFString, font.pointSize, nil)
    return NSAttributedString(
        string: text,
        attributes: [
            NSAttributedString.Key(kCTFontAttributeName as String): ctFont,
            NSAttributedString.Key(kCTForegroundColorAttributeName as String): color.cgColor,
            .paragraphStyle: style
        ]
    )
}

func drawParagraph(_ text: String, in rect: CGRect, context: CGContext, font: NSFont, color: NSColor, lineSpacing: CGFloat = 3.0, alignment: NSTextAlignment = .left) {
    let attr = attributed(text, font: font, color: color, lineSpacing: lineSpacing, alignment: alignment)
    let framesetter = CTFramesetterCreateWithAttributedString(attr)
    let path = CGPath(rect: rect, transform: nil)
    let frame = CTFramesetterCreateFrame(framesetter, CFRange(location: 0, length: attr.length), path, nil)
    context.saveGState()
    context.textMatrix = .identity
    context.translateBy(x: 0, y: 0)
    CTFrameDraw(frame, context)
    context.restoreGState()
}

func drawCenteredImage(_ image: CGImage, in rect: CGRect, context: CGContext) {
    let imageRatio = CGFloat(image.width) / CGFloat(image.height)
    let rectRatio = rect.width / rect.height
    let drawRect: CGRect
    if imageRatio > rectRatio {
        let height = rect.width / imageRatio
        drawRect = CGRect(x: rect.minX, y: rect.minY + (rect.height - height) / 2, width: rect.width, height: height)
    } else {
        let width = rect.height * imageRatio
        drawRect = CGRect(x: rect.minX + (rect.width - width) / 2, y: rect.minY, width: width, height: rect.height)
    }
    context.saveGState()
    context.interpolationQuality = .high
    context.draw(image, in: drawRect)
    context.restoreGState()
}

func drawPageChrome(_ context: CGContext, pageNumber: Int, pageRect: CGRect) {
    context.setFillColor(NSColor.white.cgColor)
    context.fill(pageRect)

    context.setStrokeColor(NSColor(calibratedRed: 0.78, green: 0.82, blue: 0.88, alpha: 1).cgColor)
    context.setLineWidth(1.0)
    context.stroke(pageRect.insetBy(dx: 28, dy: 28))

    if let logo = loadImage(logoURL.path) {
        let logoRect = CGRect(x: pageRect.midX - 150, y: pageRect.maxY - 86, width: 300, height: 58)
        drawCenteredImage(logo, in: logoRect, context: context)
    }

    let footerText = "Page \(pageNumber)"
    let footer = attributed(footerText, font: .systemFont(ofSize: 9, weight: .regular), color: .darkGray, alignment: .right)
    footer.draw(in: CGRect(x: pageRect.maxX - 90, y: pageRect.minY + 18, width: 60, height: 16))

    let date = "April 8, 2026"
    let dateAttr = attributed(date, font: .systemFont(ofSize: 9, weight: .regular), color: .darkGray)
    dateAttr.draw(in: CGRect(x: pageRect.minX + 38, y: pageRect.minY + 18, width: 100, height: 16))
}

func pageImageRect(_ pageRect: CGRect) -> CGRect {
    CGRect(x: pageRect.minX + 40, y: pageRect.minY + 44, width: pageRect.width - 80, height: 280)
}

func makePDF() throws {
    try FileManager.default.createDirectory(
        at: outputURL.deletingLastPathComponent(),
        withIntermediateDirectories: true
    )

    let pageRect = CGRect(x: 0, y: 0, width: 612, height: 792)
    guard let consumer = CGDataConsumer(url: outputURL as CFURL) else {
        throw NSError(domain: "portfolio", code: 1, userInfo: [NSLocalizedDescriptionKey: "Unable to create PDF consumer"])
    }
    var mediaBox = pageRect
    guard let context = CGContext(consumer: consumer, mediaBox: &mediaBox, nil) else {
        throw NSError(domain: "portfolio", code: 2, userInfo: [NSLocalizedDescriptionKey: "Unable to create PDF context"])
    }

    for (index, page) in pages.enumerated() {
        context.beginPDFPage(nil)
        drawPageChrome(context, pageNumber: index + 1, pageRect: pageRect)

        let titleRect = CGRect(x: 44, y: 654, width: 524, height: 64)
        drawParagraph(page.title, in: titleRect, context: context, font: .systemFont(ofSize: 19.5, weight: .bold), color: .black, lineSpacing: 1.4)

        let subtitleRect = CGRect(x: 44, y: 642, width: 524, height: 22)
        drawParagraph(page.subtitle, in: subtitleRect, context: context, font: .systemFont(ofSize: 10.5, weight: .semibold), color: .darkGray, lineSpacing: 0.5)

        let introRect = CGRect(x: 44, y: 565, width: 524, height: 68)
        drawParagraph(page.intro, in: introRect, context: context, font: .systemFont(ofSize: 11.2, weight: .regular), color: .black, lineSpacing: 3.2)

        let bulletsTitle = attributed("Key points", font: .systemFont(ofSize: 12.5, weight: .bold), color: .labelColor)
        bulletsTitle.draw(in: CGRect(x: 44, y: 536, width: 160, height: 18))

        var bulletText = ""
        for bullet in page.bullets {
            bulletText += "- \(bullet)\n"
        }
        let bulletRect = CGRect(x: 50, y: 430, width: 512, height: 118)
        drawParagraph(bulletText, in: bulletRect, context: context, font: .systemFont(ofSize: 10.4, weight: .regular), color: .black, lineSpacing: 4.2)

        let sourcesRect = CGRect(x: 44, y: 394, width: 524, height: 28)
        drawParagraph(page.sources, in: sourcesRect, context: context, font: .systemFont(ofSize: 8.6, weight: .regular), color: .darkGray, lineSpacing: 1.0)

        let imageRect = pageImageRect(pageRect)
        if let image = loadImage(root.appendingPathComponent(page.imageName).path) {
            let frameRect = CGRect(x: imageRect.minX, y: imageRect.minY, width: imageRect.width, height: imageRect.height)
            context.setFillColor(NSColor(calibratedWhite: 0.98, alpha: 1).cgColor)
            context.fill(frameRect)
            context.setStrokeColor(NSColor(calibratedRed: 0.82, green: 0.85, blue: 0.9, alpha: 1).cgColor)
            context.stroke(frameRect)
            drawCenteredImage(image, in: frameRect.insetBy(dx: 6, dy: 6), context: context)
        }

        context.endPDFPage()
    }
}

do {
    try makePDF()
    print("Wrote \(outputURL.path)")
} catch {
    fputs("Failed to create PDF: \(error)\n", stderr)
    exit(1)
}
